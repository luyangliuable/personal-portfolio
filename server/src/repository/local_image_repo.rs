use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use crate::models::local_image_model::LocalImage;

/// Implementation of the MongoModel trait for the Post model.
impl MongoModel for LocalImage {
}

/// Represents a repository for the Post model.
///
/// It wraps the generic MongoRepo to provide specific functionality for the Post model.
pub struct LocalImageRepo(pub MongoRepo<LocalImage>);
