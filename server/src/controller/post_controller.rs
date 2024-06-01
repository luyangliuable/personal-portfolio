use rocket::http::Status;
use rocket::serde::json::Json;
use redis::Commands;
use std::str::FromStr;
use crate::{utils::markdown_util, models::post_model::Post, repository::post_repo::PostRepo};

use mongodb::{
    bson::{doc, to_bson, oid::ObjectId },
    results::{ UpdateResult, InsertOneResult }
};

pub struct PostController {
    pub repo: PostRepo,
}

impl PostController  {
    pub fn new(repo: PostRepo) -> Self {
        PostController { repo }
    }


    fn cache_data(redis_con: &mut redis::Connection, key: &String, data: Post) -> Result<(), Status> {
        match serde_json::to_string(&data) {
            Ok(json_string) => {
                let _: () = redis_con.set(&key, json_string).map_err(|_| Status::InternalServerError)?;
            }
            Err(e) => {
                return Err(Status::InternalServerError)
            },
        };

        Ok(())
    }

pub fn get(&self, id: String, redis_con: &mut redis::Connection) -> Result<Json<Post>, Status> {

        // check if cached file exists
        let value: Option<String> = redis_con.get(&id).unwrap_or(None);
        if let Some(res) = value {
            let post: Post = serde_json::from_str(&res).unwrap();
            return Ok(Json(post));
        }

        ObjectId::from_str(&id)
            .map_err(|_| Status::BadRequest)
            .and_then(|object_id| self.repo.0.get(object_id).map_err(|_| Status::InternalServerError))
            .and_then(|blog_post| match blog_post.active {
                Some(false) => Err(Status::NotFound),
                _ => Ok(blog_post),
            })
            .and_then(|blog_post| {
                markdown_util::get_post_content_for_post(blog_post)
                    .map_err(|_| Status::NotFound)
                    .and_then(|blog_post_content| {
                        let _: () = Self::cache_data(redis_con, &id, blog_post_content.clone())?;
                        Ok(blog_post_content)
                    })
            })
            .map(Json)
    }

    pub fn get_all(&self) -> Result<Json<Vec<Post>>, Status> {
        let posts = match self.repo.0.get_all() {
            Ok(posts) => posts.into_iter().filter(|post| {
                match post.active {
                    Some(false) => false,
                    _ => true
                }
            }).collect(),
            Err(_) => {
                return Err(Status::InternalServerError);
            },
        };

        Ok(Json(posts))
    }

    pub fn update(&self, id: String, new_post_data: Post) -> Result<Json<UpdateResult>, Status> {
        let mut new_post_data = new_post_data;
        new_post_data.date_last_modified = Some(chrono::offset::Utc::now());
        let bson_value = to_bson(&new_post_data).map_err(|_| Status::BadRequest)?;
        let document = bson_value.as_document().ok_or(Status::InternalServerError)?;
        match self.repo.0.update(id, doc! { "$set": document }, None) {
            Ok(update_result) => Ok(Json(update_result)),
            Err(_) => Err(Status::BadRequest),
        }
    }

    pub fn insert(&self, new_post_data: Post) -> Result<Json<InsertOneResult>, Status> {
        let mut data = new_post_data;
        data.date_created = Some(chrono::offset::Utc::now());
        self.repo.0.create(data).map(Json).map_err(|_| Status::BadRequest)
    }
}
