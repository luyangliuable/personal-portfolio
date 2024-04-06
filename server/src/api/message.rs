use rocket::{http::Status, serde::json::Json, State};
use mongodb::{bson::doc, results::InsertOneResult;
use crate::models::message_model::Message;
use crate::models::message_model::MessageType;
use crate::repository::message_repo::MessageRepo;

#[post("/message", data = "<new_message>")]
pub fn insert_message(message_repo: &State<MessageRepo>, new_message: Json<Message>) -> Result<Json<InsertOneResult>, Status> {
    let mut new_message = new_message.into_inner();
    new_message.date_created = Some(chrono::offset::Utc::now());
    new_message.message_type = Some(MessageType::UserMessage);
    match message_repo.0.create(new_message) {
        Ok(message) => Ok(Json(message)),
        Err(_) => Err(Status::BadRequest),
    }
}
