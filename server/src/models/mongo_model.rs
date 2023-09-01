pub trait MongoModel: serde::Serialize + for<'de> serde::Deserialize<'de> + Unpin + Send + Sync {
}
