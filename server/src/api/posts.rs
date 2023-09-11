use rocket::{http::Status, State};
use std::str::FromStr;
use crate::{utils::markdown_util, models::post_model::Post, repository::post_repo::PostRepo};
use mongodb::bson::oid::ObjectId;
use rocket::serde::json::Json;
use mongodb::results::InsertOneResult;

/// Fetches a post based on its ObjectId.
/// Returns the post content as a `Post` object wrapped in JSON.
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
pub fn get_post_list(db: &State<PostRepo>) -> Result<Json<Vec<Post>>, Status> {
    // The `0` here is accessing the inner `MongoRepo<Post>` of `PostRepo`.
    let post_list_result = db.0.get_all(); 

    let mut result = Vec::new();

    let post_list = match post_list_result {
        Ok(posts) => posts,
        Err(_) => return Err(Status::InternalServerError),
    };

    for post in post_list {
        match markdown_util::get_post_content_for_post(post) {
            Ok(updated_post) => result.push(updated_post),
            Err(_) => return Err(Status::NotFound),
        }
    }

    Ok(Json(result))
}

/// Adds a new post to the database.
/// Accepts a JSON body with the post details and returns the result of the insertion.
#[post("/posts", data = "<new_post>")]
pub async fn index_post(db: &State<PostRepo>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    let data = new_post.into_inner();

    match db.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}
