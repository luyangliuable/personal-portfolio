use rocket::{http::Status, State, serde::json::Json};
use crate::{models::note_model::Note, repository::note_repo::NoteRepo, utils::markdown_util};
use mongodb::{results::{ UpdateResult, InsertOneResult, DeleteResult }, bson::{doc, to_bson, oid::ObjectId }};
use std::str::FromStr;

#[post("/note", data = "<new_note>")]
pub async fn index_note(repo: &State<NoteRepo>, new_note: Json<Note>) -> Result<Json<InsertOneResult>, Status> {
    let mut data = new_note.into_inner();
    data.date_created = Some(chrono::offset::Utc::now());
    repo.0.create(data).map(Json).map_err(|_| Status::BadRequest)
}


#[get("/note/<id>")]
pub async fn get_note(repo: &State<NoteRepo>, id: String, redis: &State<redis::Client>) -> Result<Json<Note>, Status> {
    ObjectId::from_str(&id)
        .map_err(|_| Status::BadRequest)
        .and_then(|object_id| repo.0.get(object_id).map_err(|_| Status::InternalServerError))
        .and_then(|blog_post| match blog_post.active {
            Some(false) => Err(Status::NotFound),
            _ => Ok(blog_post),
        })
        .and_then(|note| {
            markdown_util::get_content(note)
                .map_err(|_| Status::NotFound)
                .and_then(|blog_post_content| {
                    Ok(blog_post_content)
                })
        })
        .map(Json)
}

#[get("/note")]
pub fn get_all_note(repo: &State<NoteRepo>) -> Result<Json<Vec<Note>>, Status> {
    let notes = match repo.0.get_all() {
        Ok(posts) => posts.into_iter().filter(|post| {
            match post.active {
                Some(false) => false,
                _ => true
            }
        }).collect(),
        Err(_) => {
            return Err(Status::InternalServerError);
        },
    };

    Ok(Json(notes))
}
