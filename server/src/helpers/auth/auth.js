const config = require('../config/config');

class Auth {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password) {
    return this.password === password;
  }
}

module.exports.findByUsername = (username, cb) => {
  const userDatas = config.get('/basicAuth');
  let userData;

  userData = userDatas.map((val) => {
    if (val.username === username) {
      return val;
    }
    return '';
  });
  const user = new Auth(userData[0].username, userData[0].password);
  cb(user);
};
