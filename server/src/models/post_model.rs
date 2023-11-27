use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};

/// A blog post.
#[derive(Serialize, Deserialize, Debug)]
pub struct Post {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub heading:  String,
    pub author:  String,
    pub post_type:  String,
    pub year: i32,
    pub month: i32,
    pub date_created: String,
    pub file_name: String,
    pub tags: Option<Vec<String>>,
    pub reading_time_minutes: Option<i32>,
    pub is_featured: Option<bool>,
    pub image: Option<ObjectId>,
    pub body: String
}
