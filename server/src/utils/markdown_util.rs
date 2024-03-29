use std::fs::File;
use std::io::prelude::*;
use std::io::Error;

use crate::{ models::post_model::Post, utils::util };

pub fn markdown_store_location() -> Result<String, Error> {
    let env_variable_key = "MARKDOWN_POSTS_STORE_LOCATION".to_string();

    util::get_env_variable(env_variable_key)
}

pub fn get_path_of_stored_markdown(mut previous_post: &Post) -> Result<String, Error> {
    let store_location = markdown_store_location()?;

    // comment this out because I decided with with my own file names instead of uuid for ease of identification
    // will leave this commented out here as reference
    // let id = match &previous_post.id {
    //     Some(oid) => oid.to_string(),
    //     None => return Err(Error::new(ErrorKind::Other, "No ObjectId found")),
    // };

    let file_name = &previous_post.file_name;

    let year = &previous_post.year;
    let month = &previous_post.month;

    Ok(format!("{}/{}/{}/{}.md", store_location, year, month, file_name))
}

pub fn get_post_content_for_post(mut previous_post: Post) -> Result<Post, Error> {
    let path = get_path_of_stored_markdown(&previous_post)?;

    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    previous_post.body = contents;

    Ok(previous_post)
}
