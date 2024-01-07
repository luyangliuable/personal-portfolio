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
    ObjectId::from_str(&id)
        .map_err(|_| Status::BadRequest)
        .and_then(|object_id| db.0.get(object_id).map_err(|_| Status::InternalServerError))
        .and_then(|blog_post| markdown_util::get_post_content_for_post(blog_post).map_err(|_| Status::NotFound))
        .map(Json)
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
    let bson_value = to_bson(&new_post_data).map_err(|_| Status::BadRequest)?;
    let document = bson_value.as_document().ok_or(Status::InternalServerError)?;
    match post_repo.0.update(id, doc! { "$set": document }, None) {
        Ok(update_result) => Ok(Json( update_result )),
        Err(_) => Err(Status::BadRequest),
    }
}


#[post("/posts", data = "<new_post>")]
pub async fn index_post(db: &State<PostRepo>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    let mut data = new_post.into_inner();
    data.date_created = Some(chrono::offset::Utc::now());
    db.0.create(data).map(Json).map_err(|_| Status::BadRequest)
}
