use rocket::{http::{ContentType, Status}, serde::json::Json, State, form::FromForm};
use mongodb::{bson::doc, results::{InsertOneResult, UpdateResult}};
use crate::{models::local_image_model::LocalImage, controller::local_image_controller::LocalImageController};

#[post("/image", data = "<new_image>")]
pub fn index_local_image(controller: &State<LocalImageController>, new_image: Json<LocalImage>) -> Result<Json<InsertOneResult>, Status> {
    controller.insert(new_image.into_inner())
}

#[get("/image")]
pub fn get_all_local_image(controller: &State<LocalImageController>) -> Result<Json<Vec<LocalImage>>, Status> {
    controller.get_all()
}

#[derive(FromForm)]
pub struct GetLocalImageQuery {
    compression: Option<u8>
}

#[get("/image/<id>?<query..>")]
pub fn get_local_image(id: String, controller: &State<LocalImageController>, query: GetLocalImageQuery) -> Result<(ContentType, Vec<u8>), Status> {
    controller.get(id, query.compression.unwrap_or(100))
}

#[put("/image/<id>", data = "<new_image>")]
pub fn update_local_image(id: String, new_image: Json<LocalImage>, controller: &State<LocalImageController>) -> Result<Json<UpdateResult>, Status> {
    controller.update(id, new_image.into_inner())
}
