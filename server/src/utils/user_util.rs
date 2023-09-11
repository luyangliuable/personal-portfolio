use rocket::{State, http::Status, serde::json::Json};
use chrono::Utc;
use uuid::Uuid;
use mongodb::results::InsertOneResult;

use crate::{
    models::{user_model::{User, UserLogin}, user_session_token_model::UserSessionToken},
    repository::user_repo::UserRepo,
};

/// Enum representing the various methods a user can use to verify their identity during login.
pub enum VerificationMethod {
    Email,
    Username,
    Invalid,
}

/// Enum representing the possible outcomes of user verification during login.
pub enum LoginVerificationResult {
    Success,
    InvalidPassword,
    InvalidUsername,
    InvalidEmail,
    Invalid,
}

/// Determines the verification method based on the input user data.
///
/// # Arguments
///
/// * `user` - A reference to the UserLogin object containing login details.
pub fn determine_verification_method(user: &UserLogin) -> VerificationMethod {
    match user.email.is_some() {
        true => VerificationMethod::Email,
        false => match user.username.is_some() {
            true => VerificationMethod::Username,
            false => VerificationMethod::Invalid,
        },
    }
}

/// Verifies the user's password.
///
/// # Arguments
///
/// * `user` - A reference to the User object containing user details.
/// * `password` - A reference to the string containing the user's input password.
pub fn verify_user(user: &User, password: &str) -> Result<LoginVerificationResult, Status> {
    match bcrypt::verify(password, &user.password) {
        Ok(true) => Ok(LoginVerificationResult::Success),
        Ok(false) => Ok(LoginVerificationResult::InvalidPassword),
        Err(_) => Err(Status::InternalServerError),
    }
}

// Additional functions can be documented similarly with docstrings explaining 
// their functionality and the arguments they take.

pub fn verify_user_with_email(email: String, password: String, user_repo: &State<UserRepo>) -> Result<(LoginVerificationResult, String), Status> {
    let user_result = user_repo.get_user_by_email(&email);

    match user_result {
        Ok(user) => {
            let verification_result = verify_user(&user, &password)?;
            let id = get_id_out_of_bson(user._id.expect(""));
            Ok((verification_result, id))
        }
        Err(_) => Err(Status::Unauthorized),
    }
}

pub fn verify_user_with_username(username: String, password: String, user_repo: &State<UserRepo>) -> Result<(LoginVerificationResult, String), Status> {
    let user_result = user_repo.get_user_by_username(&username);

    match user_result {
        Ok(user) => {
            let verification_result = verify_user(&user, &password)?;
            let id = get_id_out_of_bson(user._id.expect(""));
            Ok((verification_result, id))
        }
        Err(_) => Err(Status::Unauthorized),
    }
}

pub fn hash_user_password(user: &mut User) {
    user.password = bcrypt::hash(&user.password, bcrypt::DEFAULT_COST).unwrap();
}

pub fn create_session_token(user: &mut User) -> Uuid {
    let user_session_token = Uuid::new_v4();
    user.session_token = Some(user_session_token.clone().to_string());
    user.session_token_created_date = Some(Utc::now());

    user_session_token
}

pub fn create_user(user_repo: &UserRepo, user: User) -> Result<InsertOneResult, std::io::Error> {
    user_repo.0.create(user)
}

pub fn handle_successful_creation(valid_response: InsertOneResult, user_token: Uuid) -> Result<Json<UserSessionToken>, Status> {
    let user_session_token_string = user_token.to_string();

    let user_session_token = UserSessionToken {
        userid: get_id_out_of_bson(valid_response.inserted_id),
        session_token: user_session_token_string,
    };

    Ok(Json(user_session_token))
}

pub fn get_id_out_of_bson(bson: mongodb::bson::Bson) -> String {
    bson.as_object_id().map(|oid| oid.to_string()).unwrap_or_default()
}
