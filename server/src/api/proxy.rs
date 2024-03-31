use rocket::response::stream::ByteStream;
use rocket::serde::json::{Json, Value};

mod req {
    use rocket::response::{Debug, stream::ByteStream};
    use rocket::serde::json::{Json, Value};

    pub use bytes::Bytes;

    pub type Result<T, E = Debug<reqwest::Error>> = std::result::Result<T, E>;

    pub async fn get(url: &str) -> Result<ByteStream![Bytes]> {
        let bytes_stream = reqwest::get(url).await?.bytes_stream();
        Ok(ByteStream! {
            for await bytes in bytes_stream {
                match bytes {
                    Ok(bytes) => yield bytes,
                    Err(e) => {
                        eprintln!("error while streaming: {}", e);
                        break;
                    }
                }
            }
        })
    }

    pub async fn post(url: &str, data: Option<Json<Value>>) -> Result<ByteStream![Bytes]> {
        let client = reqwest::Client::new();

        let bytes_stream = match data {
            Some(data) => {
                let raw_value: Value = data.into_inner(); // Convert Json<serde_json::Value> into serde_json::Value
                client.post(url)
                    .json(&raw_value)
                    .send()
                    .await?
                    .bytes_stream()
            },
            None => {
                client.post(url)
                    .send()
                    .await?
                    .bytes_stream()
            }
        };

        Ok(ByteStream! {
            for await bytes in bytes_stream {
                match bytes {
                    Ok(bytes) => {
                        log::info!("bytes: {:?}\n\n\n", bytes);
                        yield bytes
                    },
                    Err(e) => {
                        eprintln!("error while streaming: {}", e);
                        break;
                    }
                }
            }
        })
    }
}

#[post("/handle_data", data = "<data>")]
pub fn handle_data(data: Option<Json<Value>>) -> String {
    data.map_or_else(|| "No data received".to_string(), |extract| extract.into_inner().to_string())
}

#[get("/proxy?<url>")]
pub async fn proxy(url: String) -> req::Result<ByteStream![req::Bytes]> {
    req::get(url.as_str()).await
}

#[post("/proxy_post?<url>", data = "<data>")]
pub async fn proxy_post(url: String, data: Option<Json<Value>>) -> req::Result<ByteStream![req::Bytes]> {
    req::post(url.as_str(), data).await
}
