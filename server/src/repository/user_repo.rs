use uuid::Uuid;
use std::str::FromStr;
use std::io::Error;
use mongodb::bson::{ doc, oid::ObjectId };
use rocket::serde::json::Json;
use crate::{
    errors::user_errors::UserErrors,
    utils::user_util,
    models::{
        mongo_model::MongoModel,
        user_model::{ User, UserLogin }, 
        user_session_token_model::UserSessionToken,
    },
    repository::mongo_repo::MongoRepo,
};

/// Represents a user repository that wraps the generic MongoRepo 
/// to provide specific functionality for the User model.
pub struct UserRepo(pub MongoRepo<User>);

impl MongoModel for User {}

impl UserRepo {
    /// Finds a user document in the collection that matches the specified filter.
    fn find_one(&self, filter: mongodb::bson::document::Document) -> Result<Option<User>, Error> {
        self.0.get_col.find_one(filter, None).map_err(|e| Error::new(std::io::ErrorKind::Other, e.to_string()))
    }

    /// Retrieves a user by their email address.
    pub fn get_user_by_email(&self, email: &str) -> Result<User, UserErrors> {
        match self.find_one(doc! { "email": email }) {
            Ok(Some(user)) => Ok(user),  // User found
            Ok(None) => Err(UserErrors::UserNotFoundError),
            Err(_) => Err(UserErrors::UserNotFoundError)
        }
    }

    /// Create a new user
    pub fn create_user(&self, user: User) -> Result<Json<UserSessionToken>, UserErrors> {
        let mut user = user;

        user_util::hash_user_password(&mut user);
        user_util::assign_user_role(user_util::UserRole::User, &mut user);
        let user_login_token = user_util::inject_session_token(&mut user);

        match self.0.create(user) {
            Ok(valid_response) => Ok(user_util::handle_successful_creation(valid_response, user_login_token)),
            Err(_) => Err(UserErrors::InternalServerError),
        }
    }


    pub fn verify_user(&self, user: &User, password: &str) -> Result<user_util::LoginVerificationResult, UserErrors> {
        match bcrypt::verify(password, &user.password) {
            Ok(true) => Ok(user_util::LoginVerificationResult::Success),
            Ok(false) => Ok(user_util::LoginVerificationResult::InvalidPassword),
            Err(_) => Err(UserErrors::InternalServerError),
        }
    }

    pub fn verify_user_with_email(&self, email: String, password: String) -> Result<(user_util::LoginVerificationResult, String), UserErrors> {
        let user_result = self.get_user_by_email(&email);

        match user_result {
            Ok(user) => {
                let verification_result = self.verify_user(&user, &password)?;
                let id = user_util::get_id_out_of_bson(user._id.expect(""));
                Ok((verification_result, id))
            }
            Err(_) => Err(UserErrors::UserNotAuthorisedError),
        }
    }

    pub fn verify_user_with_username(&self, username: String, password: String) -> Result<(user_util::LoginVerificationResult, String), UserErrors> {
        let user_result = self.get_user_by_username(&username);

        match user_result {
            Ok(user) => {
                let verification_result = self.verify_user(&user, &password)?;
                let id = user_util::get_id_out_of_bson(user._id.expect(""));
                Ok((verification_result, id))
            }
            Err(_) => Err(UserErrors::UserNotAuthorisedError),
        }
    }

    pub fn perform_user_login(&self, user_login: UserLogin) -> Result<Json<UserSessionToken>, UserErrors> {
        let verification_method = user_util::determine_verification_method(&user_login);
        let verification_result = match verification_method {

            user_util::VerificationMethod::Email => {
                self.verify_user_with_email(
                    user_login.email.expect("Email is required"),
                    user_login.password
                )
            }
            user_util::VerificationMethod::Username => {
                self.verify_user_with_username(
                    user_login.username.expect("Username is required"),
                    user_login.password
                )
            }
            user_util::VerificationMethod::Invalid => {
                self.verify_user_with_username(
                    user_login.username.expect("Username is required"),
                    user_login.password
                )
            }
        };

        match verification_result {
            Ok((result, userid)) => match result {
                user_util::LoginVerificationResult::Success => {
                    match self.update_user_session_token(userid) {
                        Ok(user_session_token) => Ok(Json(user_session_token)),
                        Err(_) => Err(UserErrors::InternalServerError),
                    }
                }
                user_util::LoginVerificationResult::InvalidPassword => Err(UserErrors::InvalidPasswordError),
                user_util::LoginVerificationResult::InvalidEmail | user_util::LoginVerificationResult::InvalidUsername => Err(UserErrors::InvalidEmailError),
                user_util::LoginVerificationResult::Invalid => Err(UserErrors::InternalServerError)
            },
            Err(error) => Err(error),
        }
    }

    /// Create a new user
    pub fn verify_user_session_token(&self, user_session_token: UserSessionToken) -> Result<Json<String>, UserErrors> {
        ObjectId::from_str(&user_session_token.userid)
            .map_err(|_| UserErrors::InvalidUserIdError)
            .and_then(|object_id| {
                self.0.get(object_id)
                    .map_err(|_| UserErrors::UserNotFoundError)
            })
            .and_then(|user| {
                match user.session_token.as_ref().map(ToString::to_string) {
                    Some(session_token) if session_token == user_session_token.session_token => 
                        Ok(Json("Session token is valid".to_string())),
                    _ => Err(UserErrors::UserNotAuthorisedError),
                }
            })
    }

    /// Retrieves a user by their username.
    pub fn get_user_by_username(&self, username: &str) -> Result<User, UserErrors> {
        match self.find_one(doc! { "username": username }) {
            Ok(Some(user)) => Ok(user),  // User found
            Ok(None) => Err(UserErrors::UserNotFoundError),
            Err(_) => Err(UserErrors::UserNotFoundError)
        }
    }

    /// Updates the session token for a user identified by their ID.
    pub fn update_user_session_token(&self, userid: String) -> Result<UserSessionToken, Error> {
        let new_token = Uuid::new_v4();

        let update = doc! { "$set": { "session_token": new_token.to_string() } };

        match self.0.update(userid.clone(), update, None) {
            Ok(_) => Ok(UserSessionToken { session_token: new_token.to_string(), userid: userid.clone() }),
            Err(error) => Err(error),
        }
    }
}
