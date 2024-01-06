use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;

#[derive(Serialize, Deserialize, Debug)]
pub struct LocalImage {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub image_type: String,
    pub year: Option<i32>,
    pub month: Option<i32>,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
    #[serde(with = "date_format", default)]
    pub date_last_modified: Option<DateTime<Utc>>,
    pub file_name: String,
    pub description: Option<String>,
    pub source: Option<String>,
}
