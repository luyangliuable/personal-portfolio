use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;

use crate::models::config_model::Config;

impl MongoModel for Config {}

pub struct ConfigRepo(pub MongoRepo<Config>);
