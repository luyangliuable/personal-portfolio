use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};

/// A blog post.
#[derive(Serialize, Deserialize, Debug)]
pub struct BlogPost {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub heading:  String,
    pub date_created: String,
    pub author:  String,
    pub body: Vec<String>
}
