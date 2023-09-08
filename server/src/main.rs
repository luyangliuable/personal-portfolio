#[macro_use] 
extern crate rocket;

mod api; 
mod models;
mod utils;
mod repository;
mod database;

use repository::blog_repo::BlogRepo;
use repository::post_repo::PostRepo;
use repository::mongo_repo::MongoRepo;

use database::db_singleton::DB;

use std::env;
use mongodb::{
    bson::{ doc, oid::ObjectId },
    results::InsertOneResult,
    sync::{Client, Collection, Database},
};

// use rocket::tokio;

use models::post_model::Post;
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

/// A fairing to handle Cross-Origin Resource Sharing (CORS) headers.
pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    /// Returns the name and kind of the fairing.
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    /// Sets appropriate CORS headers to the response.
    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

/// Basic index route that returns a live message.
#[get("/")]
fn index() -> &'static str {
    "Live!"
}

fn init_db() -> Database {
    let uri = match env::var("MONGOURI") {
        Ok(v) => v.to_string(),
        Err(_) => "mongodb://localhost:27017".to_string(),
    };

    let client = Client::with_uri_str(&uri).unwrap();

    client.database("rustDB")
}

/// Launches the Rocket server and sets up routes and middlewares.
#[launch]
async fn rocket() -> _ {
    println!("Starting server...");

    // Initialize database repositories.
    let mongo_repo = MongoRepo::<Post>::init("Post", &*DB).await;
    let blog_repo = BlogRepo::init();
    let post_repo = PostRepo(mongo_repo);

    rocket::build()
        .manage(blog_repo)
        .manage(post_repo)
        .manage(DB.clone()) // IDK how in the F*** rust rocket knows this is db from &rocket::State<T> also &*DB does not work for some reason.
        .mount("/api/", routes![index])
        .mount("/api/", routes![api::blogs::get_blog_post])
        .mount("/api/", routes![api::blogs::create_blog])
        .mount("/api/", routes![api::blogs::get_blog])
        .mount("/api/", routes![api::health::check_health])
        .mount("/api/", routes![api::health::check_env_variable])
        .mount("/api/", routes![api::health::check_mongodb_uri])
        .mount("/api/", routes![api::posts::index_post])
        .mount("/api/", routes![api::posts::get_post])
        .mount("/api/", routes![api::posts::get_test_post])
        .mount("/api/", routes![api::posts::get_post_list])
        .mount("/api/", routes![api::user::register])
        .attach(CORS)
}
