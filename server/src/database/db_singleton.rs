use mongodb::sync::{Client, Database};
use std::env;
use once_cell::sync::Lazy;

pub struct DbSingleton {
    db: Database,
}

pub static DB: Lazy<Database> = Lazy::new(|| {
    dotenv::dotenv().ok();

    let uri = env::var("MONGOURI").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
    let client = Client::with_uri_str(&uri).unwrap();

    client.database("rustDB")
});
