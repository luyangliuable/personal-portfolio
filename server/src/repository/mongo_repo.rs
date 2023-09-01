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

/// Represents a generic MongoDB repository for type `T` which implements the `MongoModel` trait.
pub struct MongoRepo<T: MongoModel> {
    insert_col: Collection<T>,
    get_col: Collection<T>,
}

impl<T: MongoModel> MongoRepo<T> {
    /// Initializes a new MongoDB repository with the given collection name.
    ///
    /// # Parameters
    /// * `collection_name`: The name of the MongoDB collection to use.
    ///
    /// # Returns
    /// A new instance of `MongoRepo` for the specified collection.
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

    /// Creates a new entity in the MongoDB collection.
    ///
    /// # Parameters
    /// * `new_entity`: The entity to be inserted into the collection.
    ///
    /// # Returns
    /// A result with either the `InsertOneResult` from the MongoDB operation or an error.
    pub fn create(&self, new_entity: T) -> Result<InsertOneResult, Error> {
        let result = self
            .insert_col
            .insert_one(new_entity, None)
            .ok()
            .expect("Error creating entity");

        Ok(result)
    }

    /// Retrieves an entity with the specified `ObjectId` from the MongoDB collection.
    ///
    /// # Parameters
    /// * `id`: The `ObjectId` of the entity to be retrieved.
    ///
    /// # Returns
    /// A result with either the entity of type `T` or an error.
    pub fn get(&self, id: ObjectId) -> Result<T, Error> {
        let filter = doc! { "_id": id };

        let result = self.get_col.find_one(filter, None).ok().expect("Error getting blog post");

        match result {
            Some(document) => {
                Ok(document)
            },
            None => Err(Error::new(std::io::ErrorKind::Other, "Document not found")),
        }
    }

    pub fn get_all(&self) -> Result<Vec<T>, Error> {
        let mut results: Vec<T> = Vec::new();

        let cursor = self.get_col.find(None, None).ok().expect("Error getting blog post");

        for result in cursor {
            match result {
                Ok(document) => {
                    results.push(document);
                },
                Err(e) => {
                    println!("Error: {:?}", e);
                }
            }
        }
        Ok(results)
    }
}
