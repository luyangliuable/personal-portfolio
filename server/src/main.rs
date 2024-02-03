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

use repository::blog_repo::BlogRepo;
use repository::post_repo::PostRepo;
use repository::user_repo::UserRepo;
use repository::mongo_repo::MongoRepo;
use repository::local_image_repo::LocalImageRepo;
use config::cors::CORS;

use controller::{ post_controller::PostController, local_image_controller::LocalImageController };

use database::db_singleton::DB;
use mongodb::bson::doc;
use models::post_model::Post;
use models::user_model::User;
use models::local_image_model::LocalImage;

#[get("/")]
fn index() -> &'static str {
    "Live!"
}

/// Launches the Rocket server and sets up routes and middlewares.
#[launch]
async fn rocket() -> _ {
    println!("Starting server...");

    // Initialize database repositories.
    let blog_repo = BlogRepo::init();
    let post_repo = PostRepo(MongoRepo::<Post>::init("Post", &*DB).await);
    let user_repo = UserRepo(MongoRepo::<User>::init("User", &*DB).await);
    let local_image_repo = LocalImageRepo(MongoRepo::<LocalImage>::init("LocalImage", &*DB).await);

    let post_controller = PostController::new(post_repo);
    let local_image_controller = LocalImageController::new(local_image_repo);

    // TODO: Convert this into a toml file and load it
    rocket::build()
        .manage(blog_repo)
        .manage(post_controller)
        .manage(user_repo)
        .manage(local_image_controller)

        .mount("/api/", routes![index])
        .mount("/api/", routes![api::blogs::get_all_blog_post])
        .mount("/api/", routes![api::blogs::create_blog])
        .mount("/api/", routes![api::blogs::get_blog])

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

        .attach(CORS)
}
