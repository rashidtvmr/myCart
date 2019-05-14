const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "user.json"
);
module.exports = class Users {
  constructor(email, pass) {
    this.email = email;
    this.password = pass;
  }
  save() {
    let datas = [];
    fs.readFile(p, (err, data) => {
      if (!err) {
        datas = JSON.parse(data);
        console.log("from file:" + datas);
      }
      datas.push(this);
      console.log("datas after push:" + datas);
      fs.writeFile(p, JSON.stringify(datas), err => {
        console.log(err);
      });
    });
  }
  static fetchUsers(cb) {
    fs.readFile(p, (err, data) => {
      if (err) cb([]);
      cb(JSON.parse(data));
    });
  }
};
