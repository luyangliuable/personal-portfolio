use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{ DateTime, Utc };
use mongodb::bson::Bson;

#[derive(Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub _id: Option<Bson>,
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub role: Option<String>,
    pub session_token: Option<String>,
    pub session_token_created_date: Option<DateTime<Utc>>,
}

#[derive(Serialize, Deserialize)]
pub struct UserLogin {
    pub username: Option<String>,
    pub password: String,
    pub email: Option<String>,
}
