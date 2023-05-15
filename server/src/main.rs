#[macro_use] extern crate rocket;

mod api; 
mod models;
mod repository;
use repository::mongodb_repo::MongoRepo;

#[get("/")]
fn index() -> &'static str {
    "Live!"
}

#[launch]
fn rocket() -> _ {
    println!("Starting server...");
    let db = MongoRepo::init();

    rocket::build()
        .manage(db)
        .mount("/", routes![index])
        .mount("/", routes![api::blogs::get_blog_posts])
        .mount("/", routes![api::blogs::create_blog])
}
