use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};

/// A blog post.
#[derive(Serialize, Deserialize, Debug)]
pub struct LocalImage {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub image_type:  String,
    pub year: Option<i32>,
    pub month: Option<i32>,
    pub date_created: Option<String>,
    pub file_name: String,
    pub description:  Option<String>,
    pub source: Option<String>
}