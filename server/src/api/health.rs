#[get("/health")]
pub fn check_health() -> &'static str {
    "Hello, world!"
}
