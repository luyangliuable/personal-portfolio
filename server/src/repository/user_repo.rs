use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use uuid::Uuid;
use crate::models::{user_model::User, user_session_token_model::UserSessionToken};
use std::io::Error;
use mongodb::{
    bson::{doc, oid::ObjectId},
    results::InsertOneResult,
    sync::{Client, Collection, Database},
};

/// Implementation of the MongoModel trait for the Post model.
impl MongoModel for User {}

/// Represents a repository for the Post model.
///
/// It wraps the generic MongoRepo to provide specific functionality for the Post model.
pub struct UserRepo(pub MongoRepo<User>);

impl UserRepo {
    fn find_one(&self, filter: mongodb::bson::document::Document) -> Result<Option<User>, Error> {
        match self.0.get_col.find_one(filter, None) {
            Ok(option_user) => {
                match option_user {
                    Some(user) => Ok(Some(user)),
                    None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
                }
            },
            Err(e) => Err(Error::new(std::io::ErrorKind::Other, e.to_string())),
        }
    }

    pub fn get_user_by_email(&self, email: &str) -> Result<User, Error> {
        let filter = doc! { "email": email };

        match self.find_one(filter)? {
            Some(document) => Ok(document),
            None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
        }
    }

    pub fn get_user_by_username(&self, username: &str) -> Result<User, Error> {
        let filter = doc! { "username": "luyangliuable" };

        match self.find_one(filter)? {
            Some(document) => Ok(document),
            None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
        }
    }

    pub fn update_user_session_token(&self, userid: String) -> Result<UserSessionToken, Error> {
        let filter = doc! {
            "_id": "64fc78c393af2ad6ea13b485"
        };

        let new_token = Uuid::new_v4();

        let update = doc! {
            "$set": {
                "session_token": new_token.to_string(),
            },
        };

        let update_result = self.0.insert_col.update_one(filter, update, None);

        match update_result {
            Ok(result) => {
                Ok(UserSessionToken {
                    userid: result.upserted_id.expect("").as_object_id().map(|oid| oid.to_string()).unwrap_or_default(),
                    session_token: new_token.to_string()
                })
            }
            Err(_) => Err(Error::new(std::io::ErrorKind::Other, "Token Update failed.")),
        }

    }

    fn get_user_session_token(document: User) -> Result<UserSessionToken, Error> {
        Ok(UserSessionToken {
            userid: document._id.expect("No user id found")
                .as_object_id()
                .map(|oid| oid.to_string())
                .unwrap_or_default(),
            session_token: document.session_token.expect("No user token found").to_string(),
        })
    }

    pub fn get_user_session_token_by_username(&self, username: &str) -> Result<UserSessionToken, Error> {
        let filter = doc! { "username": username };
        match self.find_one(filter)? {
            Some(document) => Self::get_user_session_token(document),
            None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
        }
    }

    pub fn get_user_session_token_by_email(&self, email: &str) -> Result<UserSessionToken, Error> {
        let filter = doc! { "email": email };
        match self.find_one(filter)? {
            Some(document) => Self::get_user_session_token(document),
            None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
        }
    }
}
