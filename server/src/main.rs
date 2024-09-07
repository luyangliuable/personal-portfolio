#[macro_use] 
extern crate rocket;
extern crate log;

mod api; 
mod controller; 
mod config;
mod models;
mod utils;
mod errors;
mod repository;
mod database;

use repository::post_repo::PostRepo;
use repository::user_repo::UserRepo;
use repository::mongo_repo::MongoRepo;
use repository::local_image_repo::LocalImageRepo;
use repository::message_repo::MessageRepo;
use repository::note_repo::NoteRepo;
use repository::config_repo::ConfigRepo;
use config::cors::CORS;

use controller::{ post_controller::PostController, local_image_controller::LocalImageController };

use database::db_singleton::DB;
use mongodb::bson::doc;
use models::post_model::Post;
use models::user_model::User;
use models::local_image_model::LocalImage;
use models::message_model::Message;
use models::note_model::Note;
use models::config_model::Config;

#[get("/")]
fn index() -> &'static str {
    "Live!"
}

/// Launches the Rocket server and sets up routes and middlewares.
#[launch]
async fn rocket() -> _ {
    println!("Starting server...");

    let redis = redis::Client::open("redis://127.0.0.1/").unwrap();

    // Initialize database repositories.
    let post_repo = PostRepo(MongoRepo::<Post>::init("Post", &*DB).await);
    let user_repo = UserRepo(MongoRepo::<User>::init("User", &*DB).await);
    let local_image_repo = LocalImageRepo(MongoRepo::<LocalImage>::init("LocalImage", &*DB).await);
    let message_repo = MessageRepo(MongoRepo::<Message>::init("Message", &*DB).await);
    let note_repo = NoteRepo(MongoRepo::<Note>::init("Note", &*DB).await);
    let config_repo = ConfigRepo(MongoRepo::<Config>::init("Config", &*DB).await);

    let post_controller = PostController::new(post_repo);
    let local_image_controller = LocalImageController::new(local_image_repo);

    // TODO: Convert this into a toml file and load it
    rocket::build()
        .manage(redis)

        .manage(user_repo)
        .manage(message_repo)
        .manage(post_controller)
        .manage(local_image_controller)
        .manage(note_repo)
        .manage(config_repo)

        .mount("/api/", routes![index])

        .mount("/api/", routes![api::proxy::proxy])
        .mount("/api/", routes![api::proxy::proxy_post])
        .mount("/api/", routes![api::proxy::handle_data])

        .mount("/api/", routes![api::health::check_health])
        .mount("/api/", routes![api::health::check_env_variable])
        .mount("/api/", routes![api::health::check_mongodb_uri])

        .mount("/api/", routes![api::posts::index_post])
        .mount("/api/", routes![api::posts::get_post])
        .mount("/api/", routes![api::posts::get_all_post])
        .mount("/api/", routes![api::posts::update_post])

        .mount("/api/", routes![api::user::register])
        .mount("/api/", routes![api::user::login])
        .mount("/api/", routes![api::user::logout])
        .mount("/api/", routes![api::user::get_user])
        .mount("/api/", routes![api::user::check_session_token])
        .mount("/api/", routes![api::local_image::index_local_image])

        .mount("/api/", routes![api::local_image::get_local_image])
        .mount("/api/", routes![api::local_image::get_all_local_image])
        .mount("/api/", routes![api::local_image::update_local_image])

        .mount("/api/", routes![api::message::insert_message])

        .mount("/api/", routes![api::note::index_note])
        .mount("/api/", routes![api::note::get_note])
        .mount("/api/", routes![api::note::get_all_note])

        .mount("/api/", routes![api::config::insert_config])
        .mount("/api/", routes![api::config::update_config])
        .mount("/api/", routes![api::config::get_config])

        .attach(CORS)
}
