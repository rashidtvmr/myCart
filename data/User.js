const mongoClient = require("mongodb").MongoClient;
let _db;
const URI =
  "mongodb+srv://rashidtvmr:Mass94877348@mycluster-ztbvh.mongodb.net/";
const localURI = "mongodb://localhost:27017";
module.exports.dbConnect = () => {
  console.log("localURI", localURI);
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
