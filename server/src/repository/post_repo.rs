use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use crate::models::post_model::Post;

/// Implementation of the MongoModel trait for the Post model.
impl MongoModel for Post {
}

/// Represents a repository for the Post model.
///
/// It wraps the generic MongoRepo to provide specific functionality for the Post model.
pub struct PostRepo(pub MongoRepo<Post>);
