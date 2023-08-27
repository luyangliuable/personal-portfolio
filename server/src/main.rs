#[macro_use] extern crate rocket;

mod api; 
mod models;
mod utils;
mod repository;
use repository::blog_repo::BlogRepo;
use repository::post_repo::PostRepo;
use repository::mongo_repo::MongoRepo;
use models::post_model::Post;
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "*"));
        // response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[get("/")]
fn index() -> &'static str {
    "Live!"
}

#[launch]
fn rocket() -> _ {
    println!("Starting server...");
    let db = BlogRepo::init();
    let db2 = PostRepo(MongoRepo::<Post>::init("Post"));

    rocket::build()
        .manage(db)
        .manage(db2)
        .mount("/api/", routes![index])
        .mount("/api/", routes![api::blogs::get_blog_post])
        .mount("/api/", routes![api::blogs::create_blog])
        .mount("/api/", routes![api::blogs::get_blog])
        .mount("/api/", routes![api::health::check_health])
        .mount("/api/", routes![api::health::check_env_variable])
        .mount("/api/", routes![api::posts::index_post])
        .mount("/api/", routes![api::posts::get_post])
        .attach(CORS)
}
