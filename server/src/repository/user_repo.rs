use uuid::Uuid;

use std::io::Error;

use crate::{
    models::{
        mongo_model::MongoModel,
        user_model::User, 
        user_session_token_model::UserSessionToken,
    },
    repository::mongo_repo::MongoRepo,
};

use mongodb::bson::doc;

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
    pub fn get_user_by_email(&self, email: &str) -> Result<User, Error> {
        self.find_one(doc! { "email": email })?.ok_or(Error::new(std::io::ErrorKind::Other, "User not found"))
    }

    /// Retrieves a user by their username.
    pub fn get_user_by_username(&self, username: &str) -> Result<User, Error> {
        self.find_one(doc! { "username": username })?.ok_or(Error::new(std::io::ErrorKind::Other, "User not found"))
    }

    /// Updates the session token for a user identified by their ID.
    pub fn update_user_session_token(&self, userid: String) -> Result<UserSessionToken, Error> {
        let new_token = Uuid::new_v4();

        let update = doc! { "$set": { "session_token": new_token.to_string() } };

        match self.0.update_one(userid.clone(), update, None) {
            Ok(_) => Ok(UserSessionToken { session_token: new_token.to_string(), userid: userid.clone() }),
            Err(error) => Err(error),
        }
    }

    /// Constructs a UserSessionToken instance from a User instance.
    fn get_user_session_token(document: User) -> Result<UserSessionToken, Error> {
        Ok(UserSessionToken {
            userid: document._id.expect("No user id found")
                .as_object_id()
                .map(|oid| oid.to_string())
                .unwrap_or_default(),
            session_token: document.session_token.expect("No user token found").to_string(),
        })
    }
}
