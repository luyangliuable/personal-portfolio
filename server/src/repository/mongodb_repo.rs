use std::env;
extern crate dotenv;
use dotenv::dotenv;

use mongodb::{
    bson::{extjson::de::Error, oid::ObjectId, doc}, //modify here
    results::InsertOneResult,
    sync::{Client, Collection},
};

use crate::models::blog_model::BlogPost;

pub struct MongoRepo {
    col: Collection<BlogPost>,
}

impl MongoRepo {
    pub fn init() -> Self {
        //init code goes here
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => "mongodb://localhost:27017".to_string(),
        };

        let client = Client::with_uri_str(uri).unwrap();
        let db = client.database("rustDB");
        let col: Collection<BlogPost> = db.collection("BlogPost");
        MongoRepo { col }
    }

    pub fn create_blog(&self, new_blog: BlogPost) -> Result<InsertOneResult, Error> {
        //create_user code goes here
        let new_doc = BlogPost {
            id: None,
            heading: new_blog.heading,
            body: new_blog.body,
        };

        let blog_post = self
            .col
            .insert_one(new_doc, None)
            .ok()
            .expect("Error creating blog post");

        Ok(blog_post)
    }

    pub fn get_blog(&self, id: &String) -> Result<BlogPost, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let user_detail = self
            .col
            .find_one(filter, None)
            .ok()
            .expect("Error getting user's detail");
        Ok(user_detail.unwrap())
    }
}

