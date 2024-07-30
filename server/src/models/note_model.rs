use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Note {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub heading: String,
    pub author: String,
    pub description: Option<String>,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
    #[serde(with = "date_format", default)]
    pub date_last_modified: Option<DateTime<Utc>>,
    pub file_path: String,
    pub tags: Option<Vec<String>>,
    pub reading_time_minutes: Option<i32>,
    pub active: Option<bool>,
    pub image: Option<ObjectId>,
    pub checksum: Option<String>,
    pub body: String,
}
