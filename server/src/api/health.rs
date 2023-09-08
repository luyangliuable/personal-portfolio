use crate::{utils::markdown};
use rocket::{http::Status};
use std::env;

#[get("/health")]
pub fn check_health() -> &'static str {
    "Hello, world!"
}


#[get("/check_env_variable")]
pub fn check_env_variable() -> Result<String, Status> {
    match markdown::markdown_store_location() {
        Ok(path) => Ok(format!("Markdown store location: {}", path)),
        Err(e) => Err(Status::BadRequest),
    }
}


#[get("/check_mongodb_uri")]
pub fn check_mongodb_uri() -> Result<String, Status> {
    let uri = match env::var("MONGOURI") {
        Ok(v) => v.to_string(),
        Err(_) => "mongodb://localhost:27017".to_string(),
    };

    Ok(uri)
}
