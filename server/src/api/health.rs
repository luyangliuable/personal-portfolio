use crate::utils::{ markdown_util, local_image_util };
use rocket::{http::Status};
use std::env;
use std::collections::HashMap;

#[get("/health")]
pub fn check_health() -> &'static str {
    "Hello, world!"
}


#[get("/check_env_variable")]
pub fn check_env_variable() -> Result<String, Status> {
    let mut result = String::new();

    let mut checks: HashMap<&str, fn() -> Result<String, std::io::Error>> = HashMap::new();

    checks.insert("markdown", markdown_util::markdown_store_location);
    checks.insert("image", local_image_util::image_store_location);

    for (check_name, check_method) in &checks {
        match check_method() {
            Ok(path) => {
                result.push_str(&format!("{} store location: {}\n", check_name, path));
            }
            Err(_) => {
                result.push_str(&format!("No {} store location found\n", check_name));
            }
        }
    }

    let environment = env::var("ENVIRONMENT").unwrap_or_else(|_| "None".to_string());

    result.push_str(&format!("Environment: {}\n", environment));

    Ok(result)
}

#[get("/check_mongodb_uri")]
pub fn check_mongodb_uri() -> Result<String, Status> {
    let environment = match env::var("ENVIRONMENT") {
        Ok(v) => v.to_string(),
        Err(_) => "mongodb://localhost:27017".to_string(),
    };

    if environment != "production" {
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017".to_string(),
        };

        return Ok(uri);
    }

    Err(Status::Unauthorized)
}
