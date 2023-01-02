#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}

#[get("/hello/<name>")]
fn hello(name: String) -> String {
    return format!("Hello {}", name);
}
