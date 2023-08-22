extern crate dotenv;
use mongodb::bson::oid::ObjectId;
use std::{env};
use dotenv::dotenv;
use crate::models::blog_model::BlogPost;
use std::io::Error;
use mongodb::{
    bson::doc,
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
            // Err(_) => "mongodb://localhost:27017".to_string(),
        };

        // let mut client_options = ClientOptions::parse("mongodb+srv://luyangliuable:<password>@serverlessinstance0.z8d7qnv.mongodb.net/?retryWrites=true&w=majority");

        // // Set the server_api field of the client_options object to Stable API version 1
        // let server_api = ServerApi::builder().version(ServerApiVersion::V1).build();
        // client_options.server_api = Some(server_api);

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
            author: new_blog.author,
            heading: new_blog.heading,
            date_created: new_blog.date_created,
            body: new_blog.body,
        };

        let blog_post = self
            .insert_col
            .insert_one(new_doc, None)
            .ok()
            .expect("Error creating blog post");

        Ok(blog_post)
    }


    pub fn get_blog_post(&self, id: ObjectId) -> Result<BlogPost, Error> {
        let filter = doc! { "_id": id };
        let result = self.get_col.find_one(filter, None).ok().expect("Error getting blog post");

        match result {
            Some(document) => {
                let blog_post: BlogPost = BlogPost {
                    id: document.id,
                    author: document.author,
                    date_created: document.date_created,
                    heading: document.heading,
                    body: document.body
                };

                Ok(blog_post)
            }

            None => {
                Err(Error::new(std::io::ErrorKind::Other, "Error getting blog post"))
            }
        }
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
                        author: document.author,
                        date_created: document.date_created,
                        heading: document.heading,
                        body: document.body
                    };

                    results.push(blog_post);
                }
                Err(_e) => {
                    println!("Error getting blog post");
                }
            }
        };

        Ok(results)
    }
}

