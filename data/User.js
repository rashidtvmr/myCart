const mongoClient = require("mongodb").MongoClient;
let _db;
const URI =
  process.env.MONGODB_ATLAS_URI
const localURI = "mongodb://localhost:27017";
module.exports.dbConnect = () => {
  mongoClient
    .connect(URI)
    .then(client => {
      _db = client.db("myDb");
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
module.exports.getdb = () => {
  if (_db) {
    return _db;
  }
  // throw "No database found";
};
