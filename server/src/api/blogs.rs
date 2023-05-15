use rocket::serde::{json::Json, Serialize};
use mongodb::bson::oid::ObjectId;
use rocket::{http::Status, State};
use crate::{models::blog_model::BlogPost, repository::mongodb_repo::MongoRepo};
use mongodb::results::InsertOneResult;

#[get("/blogs/test")]
pub fn get_blog_posts() -> Json<BlogPost> {
    /// Returns a list of blog posts
    ///
    /// # Arguments
    ///
    /// # Examples
    /// ```

    let blog_post = BlogPost {
        id: Some(ObjectId::new()),
        heading: "Hello World".to_string(),
        body: vec!["This is a blog post".to_string()]
    };

    Json(blog_post)
}

#[post("/blogs", data = "<new_blog>")]
pub fn create_blog(
    db: &State<MongoRepo>,
    new_blog: Json<BlogPost>
) -> Result<Json<InsertOneResult>, Status> {
    let data = BlogPost {
        id: None,
        heading: new_blog.heading.to_owned(),
        body: new_blog.body.to_owned(),
    };

    let user_detail = db.create_blog(data);

    match user_detail {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::InternalServerError),
    }
}
