use rocket::{http::Status, State};
use std::str::FromStr;
use crate::{utils::markdown_util, models::post_model::Post, repository::post_repo::PostRepo};
use mongodb::{
    bson::{doc, to_bson, oid::ObjectId },
    results::UpdateResult
};
use rocket::serde::json::Json;
use mongodb::results::InsertOneResult;

#[get("/posts/<id>")]
pub async fn get_post(db: &State<PostRepo>, id: String) -> Result<Json<Post>, Status> {
    match ObjectId::from_str(&id) {
        Ok(object_id) => {

            let blog_post = db.0.get(object_id);

            match blog_post {
                Ok(blog_post) => {
                    match markdown_util::get_post_content_for_post(blog_post) {
                        Ok(updated_post) => Ok(Json( updated_post )),
                        Err(_) => Err(Status::NotFound),
                    }
                },
                Err(_) => Err(Status::InternalServerError),
            }
        },
        Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
    }
}


#[get("/posts")]
pub fn get_all_post(db: &State<PostRepo>) -> Result<Json<Vec<Post>>, Status> {
    match db.0.get_all() {
        Ok(posts) => Ok(Json(posts)),
        Err(_) => return Err(Status::InternalServerError),
    }
}


#[patch("/posts/<id>", data = "<new_post>")]
pub fn update_post(id: String, new_post: Json<Post>, post_repo: &State<PostRepo>) -> Result<Json<UpdateResult>, Status> {
    let mut new_post_data = new_post.into_inner();

    new_post_data.date_last_modified = Some(chrono::offset::Utc::now());
    
    let update_doc = match to_bson(&new_post_data) {
        Ok(mongodb::bson::Bson::Document(doc)) => doc,
        Ok(_other) => return Err(Status::InternalServerError),
        Err(_) => return Err(Status::BadRequest),
    };
    
    let update = doc! { "$set": update_doc };
    
    match post_repo.0.update_one(id, update, None) {
        Ok(update_result) => Ok(Json( update_result )),
        Err(_) => Err(Status::BadRequest),
    }
}


#[post("/posts", data = "<new_post>")]
pub async fn index_post(db: &State<PostRepo>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    let mut data = new_post.into_inner();

    data.date_created = Some(chrono::offset::Utc::now());

    match db.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}
