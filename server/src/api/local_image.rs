use rocket::{http::{ContentType, Status}, serde::json::Json, State,};
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

#[get("/image/<id>")]
pub fn get_local_image(id: String, controller: &State<LocalImageController>) -> Result<(ContentType, Vec<u8>), Status> {
    controller.get(id)
}

#[put("/image/<id>", data = "<new_image>")]
pub fn update_local_image(id: String, new_image: Json<LocalImage>, controller: &State<LocalImageController>) -> Result<Json<UpdateResult>, Status> {
    controller.update(id, new_image.into_inner())
}
