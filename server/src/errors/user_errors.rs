use rocket::http::Status;

#[derive(Debug)] // Derive debug trait for the args struct
pub enum UserErrors {
    UserNotFoundError,
    InvalidPasswordError,
    InvalidEmailError,
    InternalServerError,
    UserNotAuthorisedError,
    InvalidUserIdError
}

impl UserErrors {
    pub fn as_status(&self) -> Status {
        match self {
            UserErrors::UserNotFoundError => Status::NotFound,
            UserErrors::InvalidPasswordError => Status::Unauthorized,
            UserErrors::InvalidEmailError => Status::NotFound,
            UserErrors::InternalServerError => Status::InternalServerError,
            UserErrors::UserNotAuthorisedError => Status::Unauthorized,
            UserErrors::InvalidUserIdError => Status::BadRequest,
            _ => Status::InternalServerError
        }
    }
}
