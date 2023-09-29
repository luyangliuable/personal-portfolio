use rocket::{State, http::Status, serde::json::Json};
use rocket::http::{ CookieJar, Cookie };
use std::str::FromStr;
extern crate log;
use serde_json::json;

use crate::{
    models::{user_model::{ User, UserLogin }, user_session_token_model::UserSessionToken},
    repository::user_repo::UserRepo
};

use mongodb::bson::{ doc, oid::ObjectId };

#[get("/user")]
pub fn get_user(
    cookie_jar: &CookieJar<'_>,
    user_repo: &State<UserRepo>
) -> Result<Json<serde_json::Value>, Status> {
    match cookie_jar.get("user_id") {
        Some(user_id_cookie) => {
            let user_id = user_id_cookie.value().to_string();

            info!("{}", user_id);
            match ObjectId::from_str(&user_id) {
                Ok(object_id) => {
                    let user = user_repo.0.get(object_id);

                    match(user) {
                        Ok(valid_user) => {
                            let simple_user_details = json!({
                                "username": valid_user.username
                            });

                            Ok(Json( simple_user_details ))
                        },
                        Err(_) => Err(Status::NotFound), // Respond with a bad request status if the hex string is invalid
                    }
                },
                Err(_) => Err(Status::BadRequest), // Respond with a bad request status if the hex string is invalid
            }
        },
        None => Err(Status::NotFound),
    }
}

#[post("/register", data = "<user>")]
pub fn register(
    user: Json<User>,
    user_repo: &State<UserRepo>
) -> Result<Json<UserSessionToken>, Status> {
    match user_repo.create_user(user.into_inner()) {
        Ok(valid_response) => Ok(valid_response),
        Err(error) => Err(error.as_status())
    }
}

#[post("/session", data="<token>")]
pub fn check_session_token(
    token: Json<UserSessionToken>, 
    user_repo: &State<UserRepo>
) -> Result<Json<String>, Status> {
    match user_repo.verify_user_session_token(token.into_inner()) {
        Ok(valid_response)  => Ok(valid_response),
        Err(error) => Err(error.as_status())
    }
}

#[post("/login", data = "<user_login_details>")]
pub async fn login(
    user_login_details: Json<UserLogin>,
    cookies: &CookieJar<'_>,
    user_repo: &State<UserRepo>
) -> Result<Json<UserSessionToken>, Status> {
    match user_repo.perform_user_login(user_login_details.into_inner()) {
        Ok(valid_response) => {
            add_cookie(cookies, "session_token".to_string(), valid_response.session_token.clone());
            add_cookie(cookies, "user_id".to_string(), valid_response.userid.clone());
            Ok(valid_response)
        },
        Err(error) => Err(error.as_status())
    }
}

#[post("/logout")]
pub fn logout(cookies: &CookieJar<'_>) -> Status {
    // Remove server-side session data if needed. This part depends on your implementation.

    // Remove client-side cookies
    cookies.remove(Cookie::named("user_id"));
    cookies.remove(Cookie::named("session_token"));

    // Return status to indicate success
    Status::Ok
}

fn add_cookie(cookies: &CookieJar<'_>, name: String, value: String) {
    let name_str: &'static str = Box::leak(name.into_boxed_str());
    let cookie = Cookie::new(name_str, value);
    cookies.add(cookie);
}
