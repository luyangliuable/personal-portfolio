use std::str::FromStr;
use rocket::serde::json::Json;
use mongodb::bson::{oid::ObjectId};
use rocket::{http::Status, State};
use crate::{models::blog_model::BlogPost, repository::blog_repo::BlogRepo};
use mongodb::results::InsertOneResult;
use chrono::Utc;


#[get("/blogs/<id>")]
pub async fn get_all_blog_post(db: &State<BlogRepo>, id: String) -> Result<Json<BlogPost>, Status> {

    match ObjectId::from_str(&id) {
        Ok(object_id) => {
            let blog_post = db.get_blog_post(object_id);
            println!("{:?}", blog_post);

            match blog_post {
                Ok(blog_post) => Ok(Json(blog_post)),
                Err(_) => Err(Status::InternalServerError),
            }
        },

        Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
    }
}


#[post("/blogs", data = "<new_blog>")]
pub fn create_blog(
    db: &State<BlogRepo>,
    new_blog: Json<BlogPost>
) -> Result<Json<InsertOneResult>, Status> {
    let data = BlogPost {
        id: None,
        heading: new_blog.heading.to_owned(),
        date_created: new_blog.date_created.to_owned(),
        author: new_blog.author.to_owned(),
        body: new_blog.body.to_owned(),
    };

    let user_detail = db.create_blog(data);

    match user_detail {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/blogs")]
pub fn get_blog(db: &State<BlogRepo>) -> Result<Json<Vec<BlogPost>>, Status> {
    let blog = db.get_blogs();

    match blog {
        Ok(blog) => Ok(Json(blog)),
        Err(_) => Err(Status::InternalServerError),
    }
}
