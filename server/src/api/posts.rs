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
    match ObjectId::from_str("5f9b3b3b5b9a3b0b3c3b3b3b") {
        Ok(objectid) => {
            let post = Post {
                id: Some(objectid),
                heading: "Welcome to My Blog!".to_string(),
                author: "John Doe".to_string(),
                post_type: "Article".to_string(),
                year: 2023,
                month: 8,
                date_created: "01-08-2023".to_string(), 
                file_name: "test".to_string(),
                body: "This is a sample blog post. Welcome to the journey of learning Rust and Rocket!".to_string()
            };

            match markdown::get_path_of_stored_markdown(&post) {
                Ok(path) => {
                    Ok(path)
                },
                Err(_) => Err(Status::InternalServerError)
            }
        },
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
                Ok(blog_post) => {
                    match markdown::get_post_content_for_post(blog_post) {
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
        match markdown::get_post_content_for_post(post) {
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
