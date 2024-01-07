use rocket::{
    http::{ContentType, Status},
    serde::json::Json,
    State,
};
use mongodb::{
    bson::{doc, to_bson, oid::ObjectId},
    results::{InsertOneResult, UpdateResult}
};
use std::str::FromStr;
use crate::{
    models::local_image_model::LocalImage,
    repository::local_image_repo::LocalImageRepo,
    utils::{local_image_util, util},
};


#[post("/image", data = "<new_image>")]
pub async fn index_local_image(local_image_repo: &State<LocalImageRepo>, new_image: Json<LocalImage>) -> Result<Json<InsertOneResult>, Status> {
    let mut data = new_image.into_inner();

    data.date_created = Some(chrono::offset::Utc::now());

    match local_image_repo.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[get("/image")]
pub fn get_all_local_image(db: &State<LocalImageRepo>) -> Result<Json<Vec<LocalImage>>, Status> {
    match db.0.get_all() {
        Ok(posts) => Ok(Json(posts)),
        Err(_) => return Err(Status::InternalServerError),
    }
}

#[get("/image/<id>")]
pub fn get_local_image(id: String, local_image_repo: &State<LocalImageRepo>) -> Result<(ContentType, Vec<u8>), Status> {
    let object_id = ObjectId::from_str(&id).expect("Failed to convert id to ObjectId");

    let local_image_result = match local_image_repo.0.get(object_id) {
        Ok(local_image) => local_image,
        Err(_) => return Err(Status::NotFound),
    };

    let content_type = match local_image_result.image_type.as_str() {
        "png" => ContentType::PNG,
        "jpg" | "jpeg" => ContentType::JPEG,
        "gif" => ContentType::GIF,
        "pdf" => ContentType::PDF,
        _ => return Err(Status::UnsupportedMediaType),
    };

    let local_image_path = match local_image_util::image_store_location() {
        Ok(local_image_location) => util::path_combiner(local_image_location, local_image_result.file_name, Some( local_image_result.image_type )),
        Err(_) => return Err(Status::NotFound)
    };

    let image_bytes = std::fs::read(local_image_path).map_err(|_| {
        Status::InternalServerError
    })?;

    Ok((content_type, image_bytes))
}



#[put("/image/<id>", data = "<new_image>")]
pub fn update_local_image(id: String, new_image: Json<LocalImage>, local_image_repo: &State<LocalImageRepo>) -> Result<Json<UpdateResult>, Status> {
    let mut new_image_data = new_image.into_inner();

    new_image_data.date_last_modified = Some(chrono::offset::Utc::now());
    
    let update_doc = match to_bson(&new_image_data) {
        Ok(mongodb::bson::Bson::Document(doc)) => doc,
        Ok(_other) => return Err(Status::InternalServerError),
        Err(_) => return Err(Status::BadRequest),
    };
    
    let update = doc! { "$set": update_doc };
    
    match local_image_repo.0.update(id, update, None) {
        Ok(update_result) => {
            Ok(Json( update_result ))
        },
        Err(_) => Err(Status::BadRequest),
    }
}
