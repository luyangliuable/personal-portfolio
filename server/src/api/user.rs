use rocket::{State, http::Status, serde::json::Json};

use crate::{
    models::{user_model::{ User, UserLogin }, user_session_token_model::UserSessionToken},
    repository::user_repo::UserRepo
};

#[post("/register", data = "<user>")]
pub fn register(
    user: Json<User>,
    user_repo: &State<UserRepo>
) -> Result<Json<UserSessionToken>, Status> {
    match user_repo.create_user(user.into_inner()) {
        Ok(valid_response) => Ok(valid_response),
        Err(error) => Err(error.as_status())
    }
}

#[post("/session", data="<token>")]
pub fn check_session_token(
    token: Json<UserSessionToken>, 
    user_repo: &State<UserRepo>
) -> Result<Json<String>, Status> {
    match user_repo.verify_user_session_token(token.into_inner()) {
        Ok(valid_response)  => Ok(valid_response),
        Err(error) => Err(error.as_status())
    }
}

#[post("/login", data = "<user_login_details>")]
pub async fn login(user_login_details: Json<UserLogin>, user_repo: &State<UserRepo>) -> Result<Json<UserSessionToken>, Status> {
    match user_repo.perform_user_login(user_login_details.into_inner()) {
        Ok(valid_response) => Ok(valid_response),
        Err(error) => Err(error.as_status())
    }
}
