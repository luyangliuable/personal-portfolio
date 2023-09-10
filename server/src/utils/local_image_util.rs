use std::env;
use std::io::{ Error, ErrorKind };
use std::path::Path;

use crate::models::post_model::Post;

pub fn image_store_location() -> Result<String, Error> {
    for (key, value) in env::vars() {
        if key == "IMAGE_STORE_LOCATION" {
            return Ok(value);
        }
    }

    Err(Error::new(std::io::ErrorKind::Other, "No image store location found"))
}

pub fn get_path_of_local_image(mut previous_post: &Post) -> Result<String, Error> {
    let store_location = image_store_location()?;
    let file_name = &previous_post.file_name;
    let year = &previous_post.year;
    let month = &previous_post.month;

    // Accepted Extensions of images
    let extensions = ["png", "jpeg", "jpg"];

    for extension in &extensions {
        let path = format!("{}/{}/{}/{}.{}", store_location, year, month, file_name, extension);
        if Path::new(&path).exists() {
            return Ok(path);
        }
    }

    Err(Error::new(std::io::ErrorKind::NotFound, "No image file found with any of the expected extensions"))
}
