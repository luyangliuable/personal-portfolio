#[macro_use] extern crate rocket;

mod api; 
mod models;
mod repository;


#[get("/")]
fn index() -> &'static str {
    "Live!"
}

#[launch]
fn rocket() -> _ {
    println!("Starting server...");

    rocket::build()
    // .mount("/", routes!([index]))
        .mount("/", routes![index])
        .mount("/", routes![api::blogs::get_blog_posts])
}
