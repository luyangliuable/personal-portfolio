use rocket::{http::Status, State};
use std::str::FromStr;
use crate::{utils::markdown, models::post_model::Post, repository::post_repo::PostRepo};
use mongodb::bson::oid::ObjectId;
use rocket::serde::json::Json;
use mongodb::results::InsertOneResult;
use chrono::Utc;

/// Fetches a static test post for a given year and month.
/// Returns the post content as a string.
#[get("/test/posts")]
pub async fn get_test_post(db: &State<PostRepo>) -> Result<String, Status> {
    match markdown::get_blog_post(String::from("test"), 2023, 8) {
        Ok(post) => Ok(post),
        Err(_) => Err(Status::NotFound),
    }
}

/// Fetches a post based on its ObjectId.
/// Returns the post content as a `Post` object wrapped in JSON.
#[get("/posts/<id>")]
pub async fn get_post(db: &State<PostRepo>, id: String) -> Result<Json<Post>, Status> {
    match ObjectId::from_str(&id) {
        Ok(object_id) => {
            let blog_post = db.0.get(object_id);
            match blog_post {
                Ok(blog_post) => Ok(Json(blog_post)),
                Err(_) => Err(Status::InternalServerError),
            }
        },
        Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
    }
}

/// Adds a new post to the database.
/// Accepts a JSON body with the post details and returns the result of the insertion.
#[post("/posts", data = "<new_post>")]
pub async fn index_post(db: &State<PostRepo>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    let data = Post {
        id: None,
        heading: new_post.heading.clone(),
        year: new_post.year.clone(),
        month: new_post.month.clone(),
        date_created: new_post.date_created.clone(),
        author: new_post.author.clone(),
        body: new_post.body.clone(),
        file_name: new_post.file_name.clone(),
        post_type: new_post.post_type.clone()
    };

    match db.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}
