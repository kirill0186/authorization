const fs = require("fs");
const bcrypt = require("bcrypt-nodejs");
const uuidv4 = require("uuid/v4");

class User {
  constructor(email, password, id = uuidv4(), points = 0) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.points = points;
  }

  setPassword(password){
    this.password = this.generateHash(password);
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  addPoints(points) {
    this.points += points;
    this.saveToStorage();
  }

  saveToStorage() {
    let storage = JSON.parse(fs.readFileSync("storage/storage.json", "utf8"));
    let user = {
      id: this.id,
      email: this.email,
      password: this.password,
      points: this.points
    };

    if (userIsRegistreted(this.email)) {
      storage = removeUserFromStorage(this.id);
    }
    let updatedStorage = { ...storage, users: storage.users.concat([user]) };
    fs.writeFileSync(
      "storage/storage.json",
      JSON.stringify(updatedStorage),
      err => {
        if (err) throw err;
      }
    );
  }
}

function removeUserFromStorage(id) {
  let updatedUsers = [];
  getStorage().users.forEach(user => {
    if (user.id !== id) {
      updatedUsers.concat(user);
    }
  });
  return { ...getStorage(), users: updatedUsers };
}

function getStorage() {
  return JSON.parse(fs.readFileSync("storage/storage.json", "utf8"));
}

function getUsers() {
  return getStorage().users;
}

function userIsRegistreted(email) {
  return (
    getUsers().find(user => {
      return user.email === email;
    }) !== undefined
  );
}

function findUserByEmail(email) {
  let user = getUsers().find(user => {
    return user.email === email;
  });
  return new User(user.email, user.password, user.id, user.points);
}

function getProducts() {
  return getStorage().products;
}

function addBonusToUser(userEmail, productId) {
  let product = getProducts().find(_product => {
    return _product.id == productId;
  });
  let user = findUserByEmail(userEmail);
  let bonus = parseInt(product.price / 100)
  user.addPoints(bonus);
  return bonus;
}

function validUserPassword(email, password){
  return findUserByEmail(email).validPassword(password);

}

module.exports = {
  User,
  userIsRegistreted,
  findUserByEmail,
  getProducts,
  addBonusToUser,
  validUserPassword
};
