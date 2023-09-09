use std::str::FromStr;

use chrono::Utc;
use uuid::Uuid;
use rocket::{State, http::Status, serde::json::Json};
use mongodb::{
    bson,
    bson::oid::ObjectId,
    results::InsertOneResult,
    sync::Database,
};

use crate::{
    models::{user_model::User, user_session_token_model::UserSessionToken},
    repository::user_repo::UserRepo,
};

#[post("/register", data = "<user>")]
pub fn register(user: Json<User>, user_repo: &State<UserRepo>) -> Result<Json<UserSessionToken>, Status> {
    let mut user = user.into_inner();

    hash_user_password(&mut user);
    let user_login_token = create_session_token(&mut user);

    match create_user(&user_repo, user) {
        Ok(valid_response) => handle_successful_creation(valid_response, user_login_token),
        Err(_) => Err(Status::InternalServerError),
    }
}

fn hash_user_password(user: &mut User) {
    user.password = bcrypt::hash(&user.password, bcrypt::DEFAULT_COST).unwrap();
}

fn create_session_token(user: &mut User) -> Uuid {
    let user_session_token = Uuid::new_v4();
    user.session_token = Some( user_session_token.clone() );
    user.session_token_created_date = Some(Utc::now());

    user_session_token
}

fn create_user(user_repo: &UserRepo, user: User) -> Result<InsertOneResult, std::io::Error> {
    user_repo.0.create(user)
}

fn handle_successful_creation(valid_response: InsertOneResult, user_token: Uuid) -> Result<Json<UserSessionToken>, Status> {
    let user_session_token_string = user_token.to_string();

    let user_session_token = UserSessionToken {
        userid: valid_response.inserted_id.as_object_id().map(|oid| oid.to_string()).unwrap_or_default(),
        session_token: user_session_token_string,
    };

    Ok(Json(user_session_token))
}


#[get("/session", data="<token>")]
pub fn check_session_token(
    token: Json<UserSessionToken>, 
    db: &State<Database>, 
    user_repo: &State<UserRepo>
) -> Result<Json<String>, Status> {
    
    let user_session_token = token.into_inner();

    ObjectId::from_str(&user_session_token.userid)
        .map_err(|_| Status::BadRequest)
        .and_then(|object_id| {
            user_repo.0.get(object_id).map_err(|_| Status::InternalServerError)
        })
        .and_then(|user| {
            match user.session_token.as_ref().map(ToString::to_string) {
                Some(session_token) if session_token == user_session_token.session_token => 
                    Ok(Json("Session token is valid".to_string())),
                _ => Err(Status::Unauthorized),
            }
        })
}

// #[post("/login", data = "<user>")]
// pub async fn login(user: Json<User>, db: mongodb::Database) -> Status {
//     let users_collection = db.collection("users");
//     let user_info = user.into_inner();

//     let result = users_collection.find_one(doc! {"username": user_info.username}, None).await.unwrap();

//     if let Some(db_user) = result {
//         if bcrypt::verify(&user_info.password, &db_user.password).unwrap() {
//             return Status::Ok;
//         }
//     }

//     Status::Unauthorized
// }
