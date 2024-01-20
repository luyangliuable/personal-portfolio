use rocket::http::Status;
use rocket::serde::json::Json;
use async_trait::async_trait;
use std::str::FromStr;
use crate::{utils::markdown_util, models::post_model::Post, repository::post_repo::PostRepo, controller::traits::controller::Controller};

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

    pub fn get(&self, id: String) -> Result<Json<Post>, Status> {
        ObjectId::from_str(&id)
            .map_err(|_| Status::BadRequest)
            .and_then(|object_id| self.repo.0.get(object_id).map_err(|_| Status::InternalServerError))
            .and_then(|blog_post| markdown_util::get_post_content_for_post(blog_post).map_err(|_| Status::NotFound))
            .map(Json)
    }

    pub fn get_all(&self) -> Result<Json<Vec<Post>>, Status> {
        match self.repo.0.get_all() {
            Ok(posts) => Ok(Json(posts)),
            Err(_) => Err(Status::InternalServerError),
        }
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
