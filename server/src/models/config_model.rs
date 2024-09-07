use mongodb::bson::oid::ObjectId;
use rocket::serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Config {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub key:  String,
    pub value:  String,
}
