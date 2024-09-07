use rocket::{http::Status, serde::json::Json, State};
use mongodb::{bson::{ doc, to_bson, oid::ObjectId }, results::{ InsertOneResult, UpdateResult }};

use std::str::FromStr;

use crate::models::config_model::Config;

use crate::repository::config_repo::ConfigRepo;

#[post("/config", data = "<new_config>")]
pub fn insert_config(config_repo: &State<ConfigRepo>, new_config: Json<Config>) -> Result<Json<InsertOneResult>, Status> {
    let new_config = new_config.into_inner();

    match config_repo.0.create(new_config) {
        Ok(config) => Ok(Json(config)),
        Err(_) => Err(Status::BadRequest),
    }
}


#[get("/config/<id>")]
pub fn get_config(id: String, config_repo: &State<ConfigRepo>) -> Result<String, Status> {
    ObjectId::from_str(&id)
        .map_err(|_| Status::BadRequest)
        .and_then(|object_id| config_repo.0.get(object_id).map_err(|_| Status::InternalServerError))
        .and_then(|config| Ok(config.value))
}

#[patch("/config/<id>", data = "<new_config>")]
pub fn update_config(
    id: &str,
    config_repo: &State<ConfigRepo>,
    new_config: Json<Config>,
) -> Result<Json<UpdateResult>, Status> {
    let new_post_data = new_config.into_inner();
    let bson_value = to_bson(&new_post_data).map_err(|_| Status::BadRequest)?;
    let document = bson_value.as_document().ok_or(Status::InternalServerError)?;

    match config_repo.0.update(id.to_string(), doc! { "$set": document }, None) {
        Ok(update_result) => Ok(Json(update_result)),
        Err(_) => Err(Status::BadRequest),
    }
}
