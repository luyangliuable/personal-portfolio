use rocket::{http::{ContentType, Status}, serde::json::Json};
extern crate log;
use redis::{Commands, Client, RedisResult};
use mongodb::{bson::{doc, to_bson, oid::ObjectId}, results::{InsertOneResult, UpdateResult}};
use std::str::FromStr;
use std::io::{BufWriter, Cursor};
use crate::{
    models::local_image_model::LocalImage,
    repository::local_image_repo::LocalImageRepo,
    utils::{local_image_util, util},
};
use serde::{Deserialize, Serialize};

use image::{DynamicImage, ImageOutputFormat, GenericImageView};

#[derive(Serialize, Deserialize)]
struct CachedData {
    mime_type: String,
    content: Vec<u8>,
}

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

    fn resize_image(&self, img: &DynamicImage, content_type: ContentType, compression_percentage: u8) -> DynamicImage {
        if content_type == ContentType::PNG {
            let (width, height) = img.dimensions();
            img.resize_exact(
                width * (compression_percentage as u32) / 100,
                height * (compression_percentage as u32) / 100,
                image::imageops::FilterType::Lanczos3,
            )
        } else {
            img.clone()
        }
    }

    fn compress_image(&self, img: DynamicImage, content_type: ContentType, compression_percentage: u8) -> Result<Vec<u8>, Status> {
        let mut compressed_image = Vec::new();
        let mut writer = BufWriter::new(Cursor::new(&mut compressed_image));
        match content_type.to_string().as_str() {
            "image/png" => {
                img.write_to(&mut writer, ImageOutputFormat::Png).map_err(|_| Status::InternalServerError)?;
            }
            "image/jpeg" => {
                img.write_to(&mut writer, ImageOutputFormat::Jpeg(compression_percentage)).map_err(|_| Status::InternalServerError)?;
            }
            _ => {
                drop(writer);
                return Ok(compressed_image);
            }
        }
        drop(writer);
        Ok(compressed_image)
    }

    pub fn get(
        &self,
        id: String,
        compression_percentage: u8,
        redis_con: &mut redis::Connection
    ) -> Result<(ContentType, Vec<u8>), Status> {
        let object_id = ObjectId::from_str(&id).expect("Failed to convert id to ObjectId");

        // If already cached, return cached version instead
        let key = format!("{}_{}", id, compression_percentage);
        let value: Option<String> = redis_con.get(&key).unwrap_or(None);
        if let Some(cached_value) = value {
            let cached_data: CachedData = serde_json::from_str(&cached_value).map_err(|_| Status::InternalServerError)?;
            let content_type = match cached_data.mime_type.as_str() {
                "image/png" => ContentType::PNG,
                "image/jpeg" => ContentType::JPEG,
                "image/gif" => ContentType::GIF,
                "application/pdf" => ContentType::PDF,
                _ => ContentType::Binary,
            };
            return Ok((content_type, cached_data.content));
        }

        let local_image_result = match self.repo.0.get(object_id) {
            Ok(local_image) => local_image,
            Err(_) => return Err(Status::NotFound),
        };

        let local_image_path = match local_image_util::image_store_location() {
            Ok(local_image_location) => util::path_combiner(
                local_image_location,
                local_image_result.file_name,
                Some(local_image_result.image_type.clone())
            ),
            Err(_) => return Err(Status::NotFound),
        };

        let file_bytes = std::fs::read(&local_image_path).map_err(|_| Status::InternalServerError)?;

        let content_type = match local_image_result.image_type.as_str() {
            "png" => ContentType::PNG,
            "jpg" | "jpeg" => ContentType::JPEG,
            "gif" => {
                let content_type = ContentType::GIF;
                let _: () = Self::cache_data(redis_con, &key, file_bytes.clone(), content_type.clone())?;
                return Ok((content_type, file_bytes));
            },
            "pdf" => {
                let content_type = ContentType::PDF;
                let _: () = Self::cache_data(redis_con, &key, file_bytes.clone(), content_type.clone())?;
                return Ok((content_type, file_bytes));
            },
            _ => return Err(Status::UnsupportedMediaType)
        };

        let img = image::load_from_memory(&file_bytes).map_err(|_| Status::InternalServerError)?;
        let resized_img = self.resize_image(&img, content_type.clone(), compression_percentage);
        let compressed_image = self.compress_image(resized_img, content_type.clone(), compression_percentage)?;
        let _: () = Self::cache_data(redis_con, &key, compressed_image.clone(), content_type.clone())?;
        Ok((content_type, compressed_image))
    }

    fn cache_data(redis_con: &mut redis::Connection, key: &String, data: Vec<u8>, content_type: ContentType) -> Result<(), Status> {
        let cached_data = CachedData {
            mime_type: content_type.to_string(),
            content: data
        };
        let cached_value = serde_json::to_string(&cached_data).map_err(|_| Status::InternalServerError)?;
        let _: () = redis_con.set(&key, cached_value).map_err(|_| Status::InternalServerError)?;
        Ok(())
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
