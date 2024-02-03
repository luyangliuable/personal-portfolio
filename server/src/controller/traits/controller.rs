use rocket::http::Status;
use rocket::serde::json::Json;
use async_trait::async_trait;
use mongodb::results::{ UpdateResult, InsertOneResult };

#[async_trait]
pub trait Controller<T, R> {
    fn new(repo: R) -> Self;
    fn get_all(&self) -> Result<Json<Vec<T>>, Status>;
    fn get(&self, id: String) -> Result<Json<T>, Status>;
    fn create(&self, item: T) -> Result<Json<InsertOneResult>, Status>;
    fn insert(&self, id: String, item: T) -> Result<Json<UpdateResult>, Status>;
    // pub fn delete(&self, id: String) -> Result<Status, Status>;
}
