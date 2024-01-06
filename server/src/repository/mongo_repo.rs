use std::io::Error;
use log::{error, info};
use mongodb::{
    bson::{ doc, oid::ObjectId, Document },
    results::InsertOneResult,
    sync::{Collection, Database},
};
use std::str::FromStr;
use mongodb::results::UpdateResult;
use mongodb::options::UpdateOptions;
use crate::models::mongo_model::MongoModel;

pub struct MongoRepo<T: MongoModel> {
    pub insert_col: Collection<T>,
    pub get_col: Collection<T>
}

impl<T: MongoModel> MongoRepo<T> {
    pub async fn init(collection_name: &str, db: &Database) -> Self {
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


    pub fn update_one(&self, id: String, update: Document, options: Option<UpdateOptions>) -> Result<UpdateResult, Error> {
        let filter = ObjectId::from_str(&id)
            .map(|object_id| doc! {"_id": object_id})
            .map_err(|_| Error::new(std::io::ErrorKind::Other, "Invalid user ID"))?;

        let options = match options {
            Some(options) => options,
            None => UpdateOptions::builder().upsert(true).build()
        };

        match self.insert_col.update_one(filter, update, options) {
            Ok(result) if result.modified_count > 0 => {
                Ok(result)
            }
            Ok(result) => {
                info!(
                    "No document was upserted. Matched count: {:?}, Modified count: {:?}, {:?}",
                    result.matched_count,
                    result.modified_count,
                    result.upserted_id
                );

                Ok(result)
            }
            Err(e) => {
                error!("Token Update failed: {}", e);
                Err(Error::new(std::io::ErrorKind::Other, "Token Update failed."))
            }
        }
    }

    pub fn get(&self, id: ObjectId) -> Result<T, Error> {
        let filter = doc! { "_id": id };

        let result = self
            .get_col
            .find_one(filter, None)
            .ok()
            .expect("Error getting item");

        match result {
            Some(document) => {
                Ok(document)
            },
            None => Err(Error::new(std::io::ErrorKind::Other, "Document not found")),
        }
    }

    pub fn get_all(&self) -> Result<Vec<T>, Error> {
        let mut results: Vec<T> = Vec::new();

        let cursor = self
            .get_col
            .find(None, None)
            .ok()
            .expect("Error getting item");

        for result in cursor {
            match result {
                Ok(document) => {
                    results.push(document);
                },
                Err(e) => {
                    error!("Error: {:?}", e);
                }
            }
        }
        Ok(results)
    }
}
