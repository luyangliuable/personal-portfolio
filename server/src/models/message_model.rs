use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum MessageType {
    UserMessage,
    ConsultingMessage
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Message {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name:  String,
    pub description:  Option<String>,
    pub message_type:  Option<MessageType>,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
}
