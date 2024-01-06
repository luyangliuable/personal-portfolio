use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};
use std::env;

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
        let environment = match env::var("ENVIRONMENT") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017".to_string(),
        };

        let mut allowed_origins = Vec::new();
        if environment == "production" {
            allowed_origins.extend([
                "http://llcode.tech",
                "https://llcode.tech",
                "http://170.64.250.107",
                "https://170.64.250.107"
            ]);
        } else {
            allowed_origins.extend([
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:3001"
            ]);
        }

        if let Some(origin) = _request.headers().get_one("Origin") {
            if allowed_origins.contains(&origin) {
                response.set_header(Header::new("Access-Control-Allow-Origin", origin));
            }
        }
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}
