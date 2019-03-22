const fs = require("fs");
const bcrypt = require("bcrypt-nodejs");
const uuidv4 = require('uuid/v4');

class User {
  constructor(email, password) {
    this.id = uuidv4();
    this.email = email;
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    this.points = 0;
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  addPoints(points){
    this.points += points;
  }

  saveToStorage(){
    let storage = JSON.parse(fs.readFileSync('storage/storage.json', 'utf8'));
    let user = {
      id: this.id,
      email: this.email,
      password: this.password,
      points: this.points
    }
    let updatedStorage = { ...storage,
      users: storage.users.concat([user])
    }    
    fs.writeFileSync("storage/storage.json", JSON.stringify(updatedStorage), err => {
      if (err) throw err;
    });
  }
}


function getStorage() {
  let storage = JSON.parse(fs.readFileSync('storage/storage.json', 'utf8'));
  return storage;
}

function getUsers() {
  return getStorage().users;
}

function userIsRegistreted(email){
  return getUsers().find((user) => {
    return user.email === email;
  }) !== undefined;
}

module.exports = {
  User: User,
  userIsRegistreted: userIsRegistreted,
};
