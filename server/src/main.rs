#[macro_use] extern crate rocket;

mod api; 
mod models;
mod repository;
use repository::mongodb_repo::MongoRepo;
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
    let db = MongoRepo::init();

    rocket::build()
        .manage(db)
        .mount("/api/", routes![index])
        .mount("/api/", routes![api::blogs::get_blog_post])
        .mount("/api/", routes![api::blogs::create_blog])
        .mount("/api/", routes![api::blogs::get_blog])
        .mount("/api/", routes![api::health::check_health])
        .attach(CORS)
}
