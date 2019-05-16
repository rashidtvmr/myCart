const getdb = require("../data/User").getdb;
module.exports = class Product {
  constructor(title, price, imgUrl, desc) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.desc = desc;
  }

  save() {
    const myDb = getdb();
    return myDb
      .collection("product")
      .insertOne(this)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
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
        console.log("Error while fetch all->" + err);
      });
  }
};
