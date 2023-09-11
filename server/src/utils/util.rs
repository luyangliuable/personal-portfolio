use std::env;
use std::io::Error;

pub fn get_env_variable(env_variable: String) -> Result<String, Error> {
    for (key, value) in env::vars() {
        if key == env_variable {
            return Ok(value);
        }
    }

    let error_message = format!("ENV variable {:?} not found", env_variable);

    Err(Error::new(std::io::ErrorKind::Other, error_message))
}


pub fn path_combiner(
    root: String,
    filename: String,
    file_extension: Option<String>
) -> String {
    match file_extension {
        Some(extension) => format!("{}/{}.{}", root, filename, extension),
        None => format!("{}/{}", root, filename)
    }
}
