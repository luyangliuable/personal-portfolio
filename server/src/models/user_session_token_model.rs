use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{ DateTime, Utc };


#[derive(Serialize, Deserialize)]
pub struct UserSessionToken {
    pub userid: String,
    pub session_token: String,
}
