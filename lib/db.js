/**
 * MongoDB connection URI.
 * mongodb+srv (SRV DNS) bazi aglarda ECONNREFUSED verir;
 * bu yuzden mongodb://host:27017 formatina ceviriyoruz (direkt baglanti).
 */
function getMongoUri() {
  const uri = process.env.MONGO;
  if (!uri) return uri;
  if (uri.startsWith('mongodb+srv://')) {
    return uri
      .replace('mongodb+srv://', 'mongodb://')
      .replace(/@([^/?#]+)([/?#]|$)/, '@$1:27017$2');
  }
  return uri;
}

export const mongoUri = getMongoUri();
