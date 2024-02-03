use rocket::{http::Status, State, serde::json::Json};
use crate::{models::post_model::Post, controller::post_controller::PostController};
use mongodb::{bson::doc, results::{ UpdateResult, InsertOneResult, DeleteResult }};

#[get("/posts/<id>")]
pub async fn get_post(controller: &State<PostController>, id: String) -> Result<Json<Post>, Status> {
    controller.inner().get(id)
}

#[get("/posts")]
pub fn get_all_post(controller: &State<PostController>) -> Result<Json<Vec<Post>>, Status> {
    controller.inner().get_all()
}

#[patch("/posts/<id>", data = "<new_post>")]
pub fn update_post(id: String, new_post: Json<Post>, controller: &State<PostController>) -> Result<Json<UpdateResult>, Status> {
    controller.inner().update(id, new_post.into_inner())
}

#[post("/posts", data = "<new_post>")]
pub async fn index_post(controller: &State<PostController>, new_post: Json<Post>) -> Result<Json<InsertOneResult>, Status> {
    controller.inner().insert(new_post.into_inner())
}

#[post("/delete")]
pub async fn delete(controller: &State<PostController>) -> Result<Json<DeleteResult>, Status> {
    todo!()
}
