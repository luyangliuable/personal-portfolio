use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use crate::models::user_model::User;
use std::io::Error;
use mongodb::{
    bson::{ doc, oid::ObjectId },
    results::InsertOneResult,
    sync::{Client, Collection, Database},
};

/// Implementation of the MongoModel trait for the Post model.
impl MongoModel for User {
}

/// Represents a repository for the Post model.
///
/// It wraps the generic MongoRepo to provide specific functionality for the Post model.
pub struct UserRepo(pub MongoRepo<User>);


impl UserRepo {
    pub fn get_user_by_email(&self, email: &str) -> Result<User, Error> {
        let filter = doc! { "email": email };
        let result = self
            .0
            .get_col
            .find_one(filter, None)
            .ok()
            .expect("Failed to execute find_one on posts collection.");

        match result {
            Some(document) => {
                Ok(document)
            },
            None => Err(Error::new(std::io::ErrorKind::Other, "User not found")),
        }
    }
}
