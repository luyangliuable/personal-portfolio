use log::{error, info};
use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use uuid::Uuid;
use mongodb::options::UpdateOptions;
use crate::models::{user_model::User, user_session_token_model::UserSessionToken};
use std::{io::Error, str::FromStr};
use mongodb::{
    bson::{doc, oid::ObjectId},
    results::InsertOneResult,
    sync::{Client, Collection, Database},
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
    pub fn get_user_by_email(&self, email: &str) -> Result<User, Error> {
        self.find_one(doc! { "email": email })?.ok_or(Error::new(std::io::ErrorKind::Other, "User not found"))
    }

    /// Retrieves a user by their username.
    pub fn get_user_by_username(&self, username: &str) -> Result<User, Error> {
        self.find_one(doc! { "username": username })?.ok_or(Error::new(std::io::ErrorKind::Other, "User not found"))
    }

    /// Updates the session token for a user identified by their ID.
    pub fn update_user_session_token(&self, userid: String) -> Result<UserSessionToken, Error> {
        let filter = ObjectId::from_str(&userid)
            .map(|object_id| doc! {"_id": object_id})
            .map_err(|_| Error::new(std::io::ErrorKind::Other, "Invalid user ID"))?;

        let new_token = Uuid::new_v4();
        let update = doc! { "$set": { "session_token": new_token.to_string() } };
        let options = UpdateOptions::builder().upsert(true).build();

        match self.0.insert_col.update_one(filter, update, options) {
            Ok(result) if result.modified_count > 0 => {
                Ok(UserSessionToken { userid, session_token: new_token.to_string() })
            }
            Ok(result) => {
                error!("No document was upserted. Matched count: {:?}, Modified count: {:?}, {:?}", result.matched_count, result.modified_count, result.upserted_id);
                Err(Error::new(std::io::ErrorKind::Other, "No document was upserted."))
            }
            Err(e) => {
                error!("Token Update failed: {}", e);
                Err(Error::new(std::io::ErrorKind::Other, "Token Update failed."))
            }
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
