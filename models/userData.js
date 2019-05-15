const fs = require("fs");
const path = require("path");
const getdb = require("../data/User").getdb;
const myDb = getdb();
module.exports = class Users {
  constructor(email, pass) {
    this.email = email;
    this.password = pass;
  }
  save() {
    const myDb = getdb();
    myDb
      .collection("New-Users")
      .insertOne(this)
      .then(result => {
        console.log("Updated user->" + result.result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  static getUser(email, pass) {
    const myDb = getdb();
    return myDb
      .collection("New-Users")
      .find({ email: email, password: pass })
      .next()
      .then(result => {
        console.log("result inside model->" + result);
        return result;
      })
      .catch(err => {
        throw err;
      });
  }
  static fetchUsers() {
    const myDb = getdb();
    return myDb
      .collection("New-Users")
      .find()
      .toArray()
      .then(result => {
        // console.log("From fetch all->" + result);
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "user.json"
// );

// module.exports = class Users {
//   constructor(email, pass,id) {
//     this.email = email;
//     this.password = pass;

//   }
//   save() {
//     fs.readFile(p, (err, data) => {
//       if (!err) {
//         datas = JSON.parse(data);
//         console.log("from file:" + datas);
//       }
//       datas.push(this);
//       console.log("datas after push:" + datas);
//       fs.writeFile(p, JSON.stringify(datas), err => {
//         console.log(err);
//       });
//     });
//   }
//   static fetchUsers(cb) {
//     fs.readFile(p, (err, data) => {
//       if (err) cb([]);
//       cb(JSON.parse(data));
//     });
//   }
// };
