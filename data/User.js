const mongoClient = require("mongodb").MongoClient;
let _db;
module.exports.dbConnect = () => {
  mongoClient
    .connect(
      "mongodb+srv://rashidtvmr:Mass94877348@mycluster-ztbvh.mongodb.net/"
    )
    .then(client => {
      _db = client.db("myDb");
      console.log("connected to _db->" + client.db("myDb"));
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
