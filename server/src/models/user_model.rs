use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{ DateTime, Utc };


#[derive(Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub session_token: Option<Uuid>,
    pub session_token_created_date: Option<DateTime<Utc>>,
}
