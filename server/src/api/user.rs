use rocket::serde::json::Json;
use rocket::http::Status;
use rocket::State;
use crate::models::user_model::User;
use mongodb::sync::Database;

#[post("/register", data = "<user>")]
pub fn register(user: Json<User>, db: &State<Database>) -> Result<Json< String >, Status> {
    let users_collection = db.collection("users");
    let mut user = user.into_inner();
    
    // Hash the user's password using bcrypt
    user.password = bcrypt::hash(&user.password, bcrypt::DEFAULT_COST).unwrap();
    
    let new_user = user;

    users_collection.insert_one(new_user, None).unwrap();
    
    Ok(Json("User registered successfully".to_string()))
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
