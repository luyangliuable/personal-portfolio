use lazy_static::lazy_static;
use mongodb::bson::oid::ObjectId;
use std::env;
use dotenv::dotenv;
use std::io::Error;
use crate::{ models::{mongo_model::MongoModel, post_model::Post }, repository::mongo_repo::MongoRepo };
use mongodb::{
    bson::doc,
    results::InsertOneResult,
    sync::{Client, Collection},
};

impl MongoModel for Post {
}

pub struct PostRepo(pub MongoRepo<Post>);

