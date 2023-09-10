use rocket::{http::Status, State};
use std::str::FromStr;
use crate::{utils::markdown_util, models::local_image_model::LocalImage, repository::local_image_repo::LocalImageRepo};
use mongodb::bson::oid::ObjectId;
use rocket::serde::json::Json;
use mongodb::results::InsertOneResult;

use rocket::response::Responder;
use rocket::http::ContentType;
use rocket::response::Response;
use std::fs::File;
use std::io::Read;
use std::path::Path;


// /// Fetches a post based on its ObjectId.
// /// Returns the post content as a `Post` object wrapped in JSON.
// #[get("/posts/<id>")]
// pub async fn get_post(db: &State<PostRepo>, id: String) -> Result<Json<Post>, Status> {
//     match ObjectId::from_str(&id) {
//         Ok(object_id) => {

//             let blog_post = db.0.get(object_id);

//             match blog_post {
//                 Ok(blog_post) => {
//                     match markdown_util::get_post_content_for_post(blog_post) {
//                         Ok(updated_post) => Ok(Json( updated_post )),
//                         Err(_) => Err(Status::NotFound),
//                     }
//                 },
//                 Err(_) => Err(Status::InternalServerError),
//             }
//         },
//         Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
//     }
// }


// #[get("/posts")]
// pub fn get_post_list(db: &State<PostRepo>) -> Result<Json<Vec<Post>>, Status> {
//     // The `0` here is accessing the inner `MongoRepo<Post>` of `PostRepo`.
//     let post_list_result = db.0.get_all(); 

//     let mut result = Vec::new();

//     let post_list = match post_list_result {
//         Ok(posts) => posts,
//         Err(_) => return Err(Status::InternalServerError),
//     };

//     for post in post_list {
//         match markdown_util::get_post_content_for_post(post) {
//             Ok(updated_post) => result.push(updated_post),
//             Err(_) => return Err(Status::NotFound),
//         }
//     }

//     Ok(Json(result))
// }

/// Adds a new post to the database.
/// Accepts a JSON body with the post details and returns the result of the insertion.
#[post("/image", data = "<new_image>")]
pub async fn index_image(local_image_repo: &State<LocalImageRepo>, new_image: Json<LocalImage>) -> Result<Json<InsertOneResult>, Status> {
    let data = new_image.into_inner();

    match local_image_repo.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[get("/image/<id>")]
pub fn get_image(id: String) -> Result<(ContentType, Vec<u8>), Status> {
    // let file = File::open("path/to/your/image.jpg").map_err(rocket::response::Debug)?;
    let image_bytes = std::fs::read("/Users/blackfish/coding_profile_pic.png").map_err(|e| {
        println!("Failed to read the file: {:?}", e);
        Status::InternalServerError
    })?;

    Ok(( ContentType::PNG, image_bytes))
}
