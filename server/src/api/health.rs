use crate::{utils::markdown};
use rocket::{http::Status};

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
