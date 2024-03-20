use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;


#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum MediaType {
    Video,
    Music
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Media {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub file_location: String,
    pub file_checksum: Option<String>,
    pub media_type:  MediaType,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
    #[serde(with = "date_format", default)]
    pub date_last_modified: Option<DateTime<Utc>>,
    pub active: Option<bool>
}
