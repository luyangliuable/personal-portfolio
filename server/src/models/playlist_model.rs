use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{Utc, DateTime};
use crate::models::utils::date_format::date_format;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum Source {
    Youtube,
    Spotify,
    Soundcloud
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "UPPERCASE")]
pub enum MediaType {
    Video,
    Music
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Playlist {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name:  String,
    pub description:  Option<String>,
    pub media_type:  MediaType,
    pub source:  Source,
    pub source_website_id: Option<String>,
    #[serde(with = "date_format", default)]
    pub date_created: Option<DateTime<Utc>>,
    #[serde(with = "date_format", default)]
    pub date_last_modified: Option<DateTime<Utc>>,
    pub tags: Option<Vec<String>>,
    pub active: Option<bool>
}
