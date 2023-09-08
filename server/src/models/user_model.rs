use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub username: String,
    pub password: String,
    pub email: String,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String
}
