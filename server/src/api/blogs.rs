use rocket::serde::{json::Json, Serialize};

// #[serde(crate="rocket::serde")]

/// A blog post.
#[derive(Serialize, Debug)]
pub struct BlogPost {
    pub heading:  String,
    pub body: Vec<String>
}

// pub struct CustomStatus<T: Responder<'static>>(Status, T);

// impl<'r, T: Responder<'r>> Responder<'r> for CustomStatus<T> {
//     fn respond_to(self, req: &'r Request) -> response::Result<'r> {
//         Response::build_from(self.1.respond_to(req)?)
//             .status(self.0)
//             .ok()
//     }
// }


#[get("/blogs")]
pub fn get_blog_posts() -> Json<BlogPost> {
    /// Returns a list of blog posts
    ///
    /// # Arguments
    ///
    /// # Examples
    /// ```

    let blog_post = BlogPost {
        heading: "Hello World".to_string(),
        body: vec!["This is a blog post".to_string()]
    };

    Json(blog_post)
}

