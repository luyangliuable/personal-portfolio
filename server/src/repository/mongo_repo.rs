extern crate dotenv;
use mongodb::bson::oid::ObjectId;
use std::env;
use dotenv::dotenv;
use std::io::Error;
use mongodb::{
    bson::doc,
    results::InsertOneResult,
    sync::{Client, Collection},
};

use crate::models::mongo_model::MongoModel;

pub struct MongoRepo<T: MongoModel> {
    insert_col: Collection<T>,
    get_col: Collection<T>,
}

// The implementation will change to use generics.
impl<T: MongoModel> MongoRepo<T> {
    pub fn init(collection_name: &str) -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017".to_string(),
        };

        let client = Client::with_uri_str(&uri).unwrap();
        let db = client.database("rustDB");
        let get_col: Collection<T> = db.collection(collection_name);
        let insert_col: Collection<T> = db.collection(collection_name);
        MongoRepo { insert_col, get_col }
    }

    pub fn create(&self, new_entity: T) -> Result<InsertOneResult, Error> {
        let result = self
            .insert_col
            .insert_one(new_entity, None)
            .ok()
            .expect("Error creating entity");

        Ok(result)
    }


    pub fn get(&self, id: ObjectId) -> Result<T, Error> {
        let filter = doc! { "_id": id };

        let result = self.get_col.find_one(filter, None).ok().expect("Error getting blog post");

        match result {
            Some(document) => {
                Ok( document )
            },
            None => Err(Error::new(std::io::ErrorKind::Other, "Document not found")),
        }

    }

}
