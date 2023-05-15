use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};

/// A blog post.
#[derive(Serialize, Deserialize, Debug)]
pub struct BlogPost {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub heading:  String,
    pub body: Vec<String>
}
