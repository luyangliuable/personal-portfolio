use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};
use std::env;
use log::info;

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
        let environment = env::var("ENVIRONMENT").unwrap_or_else(|_| "development".to_string());

        let allowed_origins = if environment == "production" {
            vec![
                "http://llcode.tech",
                "https://llcode.tech",
                "http://170.64.250.107",
                "https://170.64.250.107"
            ]
        } else {
            vec![
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:3001"
            ]
        };

        if let Some(origin) = _request.headers().get_one("Origin") {
            info!("Request Origin: {}", origin);
            if allowed_origins.contains(&origin) {
                info!("Allowed Origin: {}", origin);
                response.set_header(Header::new("Access-Control-Allow-Origin", origin));
            }
        } else if environment != "production" {
            response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        }

        response.set_header(Header::new("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}
