use std::fs::File;
use std::result::Result;
use std::io::{ Error, Read };

use crate::models::note_model::Note;
use crate::models::post_model::Post;
use crate::utils::util;

// Define a trait that provides a method to get the path for the stored content
pub trait Storable {
    fn get_path(&self) -> Result<String, Error>;
    fn set_body(&mut self, body: String);
}

impl Storable for Post {
    fn get_path(&self) -> Result<String, Error> {
        let store_location = markdown_store_location()?;
        let file_name = &self.file_name;
        let year = &self.year;
        let month = &self.month;
        Ok(format!("{}/{}/{}/{}.md", store_location, year, month, file_name))
    }

    fn set_body(&mut self, body: String) {
        self.body = body;
    }
}

impl Storable for Note {
    fn get_path(&self) -> Result<String, Error> {
        let store_location = notes_store_location()?;
        Ok(format!("{}/{}", store_location, &self.file_path))
    }

    fn set_body(&mut self, body: String) {
        self.body = body;
    }
}

pub fn markdown_store_location() -> Result<String, Error> {
    let env_variable_key = "MARKDOWN_POSTS_STORE_LOCATION".to_string();
    util::get_env_variable(env_variable_key).map_err(Error::from)
}

pub fn notes_store_location() -> Result<String, Error> {
    let env_variable_key = "NOTES_STORE_LOCATION".to_string();
    util::get_env_variable(env_variable_key).map_err(Error::from)
}

pub fn get_content<T: Storable>(mut content: T) -> Result<T, Error> {
    let path = content.get_path()?;

    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    content.set_body(contents);

    Ok(content)
}
