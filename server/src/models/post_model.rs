use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;

#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub heading: String,
    pub author: String,
    pub description: Option<String>,
    pub post_type: String,
    pub year: i32,
    pub month: i32,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
    #[serde(with = "date_format", default)]
    pub date_last_modified: Option<DateTime<Utc>>,
    pub file_name: String,
    pub tags: Option<Vec<String>>,
    pub reading_time_minutes: Option<i32>,
    pub is_featured: Option<bool>,
    pub in_progress: Option<bool>,
    pub active: Option<bool>,
    pub image: Option<ObjectId>,
    pub checksum: Option<String>,
    pub body: String,
}
