const bcrypt = require("bcrypt");
const getdb = require("../data/User").getdb;
module.exports = class Users {
  constructor(email, pass) {
    this.email = email;
    this.password = pass;
    this.cart = { items: [] };

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
        return err;
      });
  }
  static findById(id) {
    const myDb = getdb();
    return myDb
      .collection("New-Users")
      .find({ _id: id })
      .next()
      .then(result => {
        console.log("user found:" + result);
        return result;
      })
      .catch(err => {
        return err;
      });
  }
  static addToCart(id, user) {
    var currentCart;
    let newQuantity = 1;
    const myDb = getdb();
    currentCart = { ...user.cart };
    const index = currentCart.items.findIndex(c => {
      return c._id.toString() === id.toString();
    });
    console.log("index", index);
    if (index >= 0) {
      newQuantity = currentCart.items[index].quantity + 1;
      currentCart.items[index].quantity = newQuantity;
    } else {
      currentCart.items.push({ _id: id, quantity: 1 });
    }
    return myDb.collection("New-Users").updateOne(
      { _id: user._id },
      {
        $set: {
          cart: currentCart
        }
      }
    );
  }
  // static fetchUsers() {
  //   const myDb = getdb();
  //   return myDb
  //     .collection("New-Users")
  //     .find()
  //     .toArray()
  //     .then(result => {
  //       // console.log("From fetch all->" + result);
  //       return result;
  //     })
  //     .catch(err => {
  //       console.log("Error inside fetchAll() od User->" + err);
  //       throw err;
  //     });
  // }
  static removeCartItem(id, user) {
    var currentCart;
    let newQuantity = 1;
    const myDb = getdb();
    currentCart = { ...user.cart };
    const index = currentCart.items.findIndex(c => {
      return c._id.toString() === id.toString();
    });
    console.log("index", index);
    if (index >= 0) {
      newQuantity = currentCart.items[index].quantity - 1;
      if (newQuantity == 0) {
        currentCart.items.splice(index, 1);
      } else {
        currentCart.items[index].quantity = newQuantity;
      }
    }
    return myDb.collection("New-Users").updateOne(
      { _id: user._id },
      {
        $set: {
          cart: currentCart
        }
      }
    );
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
