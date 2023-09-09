use std::{ str::FromStr, io::Error };
use chrono::Utc;
use uuid::Uuid;
use rocket::{State, http::Status, serde::json::Json};
use mongodb::{
    bson::oid::ObjectId,
    sync::Database,
};

use crate::{
    models::{user_model::{ User, UserLogin }, user_session_token_model::UserSessionToken},
    repository::user_repo::UserRepo,
    api::user::utils::user_util
};

#[post("/register", data = "<user>")]
pub fn register(user: Json<User>, user_repo: &State<UserRepo>) -> Result<Json<UserSessionToken>, Status> {
    let mut user = user.into_inner();

    user_util::hash_user_password(&mut user);
    let user_login_token = user_util::create_session_token(&mut user);

    match user_util::create_user(&user_repo, user) {
        Ok(valid_response) => user_util::handle_successful_creation(valid_response, user_login_token),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/session", data="<token>")]
pub fn check_session_token(
    token: Json<UserSessionToken>, 
    db: &State<Database>, 
    user_repo: &State<UserRepo>
) -> Result<Json<String>, Status> {
    
    let user_session_token = token.into_inner();

    ObjectId::from_str(&user_session_token.userid)
        .map_err(|_| Status::BadRequest)
        .and_then(|object_id| {
            user_repo.0.get(object_id).map_err(|_| Status::InternalServerError)
        })
        .and_then(|user| {
            match user.session_token.as_ref().map(ToString::to_string) {
                Some(session_token) if session_token == user_session_token.session_token => 
                    Ok(Json("Session token is valid".to_string())),
                _ => Err(Status::Unauthorized),
            }
        })
}

#[post("/login", data = "<user_login_details>")]
pub async fn login(user_login_details: Json<UserLogin>, user_repo: &State<UserRepo>) -> Result<Json<UserSessionToken>, Status> {
    let user_login_details = user_login_details.into_inner();

    let verification_method = user_util::determine_verification_method(&user_login_details);

    let verification_result = match verification_method {
        user_util::VerificationMethod::Email => {
            user_util::verify_user_with_email(
                user_login_details.email.expect("Email is required"),
                user_login_details.password,
                user_repo,
            )
        }
        user_util::VerificationMethod::Username => {
            user_util::verify_user_with_username(
                user_login_details.username.expect("Username is required"),
                user_login_details.password,
                user_repo,
            )
        }
        user_util::VerificationMethod::Invalid => {
            user_util::verify_user_with_username(
                user_login_details.username.expect("Username is required"),
                user_login_details.password,
                user_repo,
            )
        }
    };

    match verification_result {
        Ok((result, userid)) => match result {
            user_util::LoginVerificationResult::Success => {
                match user_repo.update_user_session_token(userid) {
                    Ok(user_session_token) => Ok(Json(user_session_token)),
                    Err(_) => Err(Status::InternalServerError),
                }
            }
            user_util::LoginVerificationResult::InvalidPassword => Err(Status::Unauthorized),
            user_util::LoginVerificationResult::InvalidEmail | user_util::LoginVerificationResult::InvalidUsername => Err(Status::NotFound),
            user_util::LoginVerificationResult::Invalid => Err(Status::InternalServerError),
        },
        Err(error) => Err(error),
    }
}
