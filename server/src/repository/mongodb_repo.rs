extern crate dotenv;
use std::{env, sync::mpsc::RecvError};
use dotenv::dotenv;
use crate::models::blog_model::BlogPost;
use mongodb::{
    bson::{Document, extjson::de::Error, oid::ObjectId, doc}, //modify here
    results::InsertOneResult,
    sync::{Client, Collection},
};


pub struct MongoRepo {
    insert_col: Collection<BlogPost>,
    get_col: Collection<BlogPost>
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
        let get_col: Collection<BlogPost> = db.collection("BlogPost");
        let insert_col: Collection<BlogPost> = db.collection("BlogPost");
        MongoRepo { insert_col, get_col }
    }

    pub fn create_blog(&self, new_blog: BlogPost) -> Result<InsertOneResult, Error> {
        //create_user code goes here
        let new_doc = BlogPost {
            id: None,
            heading: new_blog.heading,
            body: new_blog.body,
        };

        let blog_post = self
            .insert_col
            .insert_one(new_doc, None)
            .ok()
            .expect("Error creating blog post");

        Ok(blog_post)
    }

    pub fn get_blogs(&self) -> Result<Vec<BlogPost>, Error> {
        let filter = doc! {};

        let mut results: Vec<BlogPost> = Vec::new();

        let cursor = self
            .get_col
            .find(filter, None)
            .ok()
            .expect("Error getting blogs");

        for result in cursor {
            // Need to convert the document to a BlogPost before adding it to the results vector
            match result {
                Ok(document) => {
                    let blog_post: BlogPost = BlogPost {
                        id: document.id,
                        heading: document.heading,
                        body: document.body
                    };

                    results.push(blog_post);
                }
                Err(e) => {
                    println!("Error getting blog post");
                }
            }
        };

        Ok(results)
    }
}

