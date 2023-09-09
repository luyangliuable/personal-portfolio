use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use crate::models::user_model::User;

/// Implementation of the MongoModel trait for the Post model.
impl MongoModel for User {
}

/// Represents a repository for the Post model.
///
/// It wraps the generic MongoRepo to provide specific functionality for the Post model.
pub struct UserRepo(pub MongoRepo<User>);
