use std::env;
use std::fs::File;
use std::io::prelude::*;
use std::io::Error;

pub fn markdown_store_location() -> Result<String, Error> {
    for (key, value) in env::vars() {
        if key == "MARKDOWN_POSTS_STORE_LOCATION" {
            return Ok(value);
        }
    }

    Err(Error::new(std::io::ErrorKind::Other, "No markdown store location found"))
}


pub fn get_blog_post(id: String, year: i32, month: i32) -> Result<String, Error> {
    let store_location = markdown_store_location()?;

    let path = format!("{}/{}/{}/{}.md", store_location, year, month, id);
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}
