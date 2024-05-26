use rocket::{http::{ContentType, Status}, serde::json::Json};
extern crate log;
use mongodb::{bson::{doc, to_bson, oid::ObjectId}, results::{InsertOneResult, UpdateResult}};
use std::str::FromStr;
use std::io::{BufWriter, Cursor};
use crate::{
    models::local_image_model::LocalImage,
    repository::local_image_repo::LocalImageRepo,
    utils::{local_image_util, util},
};
use image::{DynamicImage, ImageOutputFormat};


pub struct LocalImageController {
    pub repo: LocalImageRepo
}

impl LocalImageController  {
    pub fn new(repo: LocalImageRepo) -> Self {
        LocalImageController { repo }
    }

    pub fn insert(&self, new_image: LocalImage) -> Result<Json<InsertOneResult>, Status> {
        let mut new_image = new_image;
        new_image.date_created = Some(chrono::offset::Utc::now());

        match self.repo.0.create(new_image) {
            Ok(user) => Ok(Json(user)),
            Err(_) => Err(Status::BadRequest),
        }
    }

    pub fn get_all(&self) -> Result<Json<Vec<LocalImage>>, Status> {
        match self.repo.0.get_all() {
            Ok(posts) => Ok(Json(posts)),
            Err(_) => return Err(Status::InternalServerError),
        }
    }

    pub fn get(&self, id: String) -> Result<(ContentType, Vec<u8>), Status> {
        let object_id = ObjectId::from_str(&id).expect("Failed to convert id to ObjectId");

        let local_image_result = match self.repo.0.get(object_id) {
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
            Ok(local_image_location) => util::path_combiner(local_image_location, local_image_result.file_name, Some(local_image_result.image_type)),
            Err(_) => return Err(Status::NotFound),
        };

        let image_bytes = std::fs::read(&local_image_path).map_err(|_| Status::InternalServerError)?;
        let img = image::load_from_memory(&image_bytes).map_err(|_| Status::InternalServerError)?;
        
        let compressed_image = {
            let mut compressed_image = Vec::new();
            {
                let mut writer = BufWriter::new(Cursor::new(&mut compressed_image));
                match content_type.to_string().as_str() {
                    "image/png" => {
                        img.write_to(&mut writer, ImageOutputFormat::Png).map_err(|_| Status::InternalServerError)?;
                    }
                    "image/jpeg" => {
                        img.write(to(&mut writer, ImageOutputFormat::Jpeg(75)).map_err(|_| Status::InternalServerError)?;
                    }
                    _ => {
                        return Ok((content_type, image_bytes));
                    }
                }
            }
            compressed_image
        };

        Ok((content_type, compressed_image))
    }

    pub fn update(&self, id: String, new_image: LocalImage) -> Result<Json<UpdateResult>, Status> {
        let mut new_image_data = new_image;

        new_image_data.date_last_modified = Some(chrono::offset::Utc::now());
        
        let update_doc = match to_bson(&new_image_data) {
            Ok(mongodb::bson::Bson::Document(doc)) => doc,
            Ok(_other) => return Err(Status::InternalServerError),
            Err(_) => return Err(Status::BadRequest),
        };
        
        let update = doc! { "$set": update_doc };
        
        match self.repo.0.update(id, update, None) {
            Ok(update_result) => {
                Ok(Json( update_result ))
            },
            Err(_) => Err(Status::BadRequest),
        }
    }
}




