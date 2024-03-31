use rocket::{http::Status, serde::json::Json, State};
use mongodb::{bson::doc, results::{InsertOneResult, UpdateResult}};
use crate::models::media_model::Media;
use crate::models::media_model::MediaType;
use crate::repository::media_repo::MediaRepo;

#[post("/media", data = "<new_media>")]
pub fn index_media(media_repo: &State<MediaRepo>, new_media: Json<Media>) -> Result<Json<InsertOneResult>, Status> {
    let mut new_media = new_media.into_inner();

    new_media.date_created = Some(chrono::offset::Utc::now());
    new_media.media_type = MediaType::Music;

    match media_repo.0.create(new_media) {
        Ok(media) => Ok(Json(media)),
        Err(_) => Err(Status::BadRequest),
    }
}

#[get("/media/<id>")]
pub fn get(media_repo: &State<MediaRepo>, id: string) -> Result<(ContentType, Vec<u8>), Status> {
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

    let image_bytes = std::fs::read(local_image_path).map_err(|_| {
        Status::InternalServerError
    })?;

    Ok((content_type, image_bytes))
}
