const getdb = require("../data/User").getdb;
const ObjectId = require("mongodb").ObjectID;
module.exports = class Product {
  constructor(title, price, imgUrl, desc, id) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this._id = id;
  }
  static getById(id) {
    const pro_id = new ObjectId(id);
    const myDb = getdb();
    return myDb
      .collection("product")
      .find({ _id: pro_id })
      .next()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("Error inside getById()" + err);
      });
  }

  save() {
    const myDb = getdb();
    let dbo;
    if (this._id) {
      dbo = myDb
        .collection("product")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbo = myDb.collection("product").insertOne(this);
    }
    return dbo
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("Error while saving in save()" + err);
      });
  }
  static deleteById(id) {
    const myDb = getdb();
    return myDb
      .collection("product")
      .deleteOne({ _id: id })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("Error inside deleteById()" + err);
      });
  }
  static fetchAll() {
    const myDb = getdb();
    return myDb
      .collection("product")
      .find()
      .toArray()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("Error Inside fetchAll()->" + err);
      });
  }
};
