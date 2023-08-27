use rocket::{http::Status, State};
use std::str::FromStr;
use crate::{utils::markdown, models::post_model::Post, repository::post_repo::PostRepo};
use mongodb::bson::oid::ObjectId;
use rocket::serde::json::Json;
use mongodb::results::InsertOneResult;
use chrono::{Utc};


// #[get("/posts/<id>")]
// pub async fn get_post(db: &State<PostRepo>, id: String) -> Result<String, Status> {
//     match markdown::get_blog_post(String::from("test"), 2023, 8) {
//         Ok(post) => Ok(post),
//         Err(_) => Err(Status::NotFound),
//     }
// }

#[get("/posts/<id>")]
pub async fn get_post(db: &State<PostRepo>, id: String) -> Result<Json<Post>, Status> {
    match ObjectId::from_str(&id) {
        Ok(object_id) => {
            let blog_post = db.0.get(object_id);
            println!("{:?}", blog_post);

            match blog_post {
                Ok(blog_post) => Ok(Json(blog_post)),
                Err(_) => Err(Status::InternalServerError),
            }
        },

        Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
    }
}


#[post("/posts", data = "<new_post>")]
pub async fn index_post(db: &State<PostRepo>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    let data = Post {
        id: None,
        heading: new_post.heading.to_owned(),
        year: new_post.year.to_owned(),
        month: new_post.month.to_owned(),
        date_created: new_post.date_created.to_owned(),
        author: new_post.author.to_owned(),
        body: new_post.body.to_owned(),
        file_name: new_post.file_name.to_owned(),
        post_type:  new_post.post_type.to_owned()
    };

    let user_detail = db.0.create(data);

    match user_detail {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}
