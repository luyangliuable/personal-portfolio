use crate::models::mongo_model::MongoModel;
use crate::repository::mongo_repo::MongoRepo;
use crate::models::note_model::Note;

impl MongoModel for Note {}


pub struct NoteRepo(pub MongoRepo<Note>);
