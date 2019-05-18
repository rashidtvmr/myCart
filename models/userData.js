const bcrypt = require("bcrypt");
const getdb = require("../data/User").getdb;
module.exports = class Users {
  constructor(email, pass) {
    this.email = email;
    this.password = pass;
    this.cart = [];

    // this.bcryptin();
  }
  // async bcryptin(pass) {
  //   console.log("Executed:" + pass);
  //   return await bcrypt.hash(this.password, 12);
  // }
  save() {
    const myDb = getdb();
    return myDb
      .collection("New-Users")
      .insertOne(this)
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log("Error inside User registeration" + err);
      });
    // .then(result => {
    //   //  console.log("Updated user->" + result);
    //   return result;
    // })
    // .catch(err => {
    //   console.log("IError inside model->" + err);
    //   // throw err;
    //   return Promise.resolve(err);
    // });
  }
  static getUser(email) {
    const myDb = getdb();
    return myDb
      .collection("New-Users")
      .find({ email: email })
      .next()
      .then(result => {
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
        console.log("Error inside fetchAll() od User->" + err);
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
