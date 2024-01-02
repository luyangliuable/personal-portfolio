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


/// Adds a new post to the database.
/// Accepts a JSON body with the post details and returns the result of the insertion.
#[post("/image", data = "<new_image>")]
pub async fn index_image(local_image_repo: &State<LocalImageRepo>, new_image: Json<LocalImage>) -> Result<Json<InsertOneResult>, Status> {
    let data = new_image.into_inner();

    match local_image_repo.0.create(data) {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[get("/image/<id>")]
pub fn get_image(id: String, local_image_repo:&State<LocalImageRepo>) -> Result<(ContentType, Vec<u8>), Status> {
    let object_id = ObjectId::from_str(&id).expect("Failed to convert id to ObjectId");

    let local_image_result = match local_image_repo.0.get(object_id) {
        Ok(local_image) => local_image,
        Err(_) => return Err(Status::NotFound),
    };

    let local_image_path = match local_image_util::image_store_location() {
        Ok(local_image_location) => util::path_combiner(local_image_location, local_image_result.file_name, Some( local_image_result.image_type )),
        Err(_) => return Err(Status::NotFound)
    };

    let image_bytes = std::fs::read(local_image_path).map_err(|e| {
        println!("Failed to read the file: {:?}", e);
        Status::InternalServerError
    })?;

    Ok(( ContentType::PNG, image_bytes))
}



#[put("/image/<id>", data = "<new_image>")]
pub fn update_image_index(id: String, new_image: Json<LocalImage>, local_image_repo: &State<LocalImageRepo>) -> Result<Json<UpdateResult>, Status> {
    let new_image_data = new_image.into_inner();
    
    let update_doc = match to_bson(&new_image_data) {
        Ok(mongodb::bson::Bson::Document(doc)) => doc,
        Ok(_other) => return Err(Status::InternalServerError),
        Err(_) => return Err(Status::BadRequest),
    };
    
    let update = doc! { "$set": update_doc };
    
    match local_image_repo.0.update_one(id, update, None) {
        Ok(update_result) => {
            // Here, assuming user is of a type that has these methods; adjust as necessary
            Ok(Json( update_result ))
        },
        Err(_) => Err(Status::BadRequest),
    }
}
