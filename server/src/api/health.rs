#[get("/health")]
fn index() -> &'static str {
    "Hello, world!"
}
