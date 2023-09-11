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

    // let check = vec![markdown_util::markdown_store_location, local_image_util::image_store_location];
    
    let mut checks = HashMap::new();

    checks.insert(
        "markdown",
        markdown_util::markdown_store_location as fn() -> Result<String, std::io::Error>
    );
    checks.insert(
        "image",
        local_image_util::image_store_location as fn() -> Result<String, std::io::Error>
    );

    for (check_name, check_method ) in checks {
        match check_method() {
            Ok(path) => {
                result.push_str(&format!("{} store location: {}\n", check_name, path));
            }
            Err(_) => {
                result.push_str(&format!("No {} store location found\n", check_name));
            }
        }
    }

    Ok(result)
}


#[get("/check_mongodb_uri")]
pub fn check_mongodb_uri() -> Result<String, Status> {
    let uri = match env::var("MONGOURI") {
        Ok(v) => v.to_string(),
        Err(_) => "mongodb://localhost:27017".to_string(),
    };

    Ok(uri)
}
