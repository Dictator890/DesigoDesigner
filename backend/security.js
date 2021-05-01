require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
async function verifyToken(token) {
  if (token) {
    try {
      const data = jwt?.verify(token, process.env.SECRET_KEY);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    console.log("Promise rejected");
    return Promise.reject();
  }
}
const validate_username = (username) => {
  if (username && typeof username === "string") {
    return /^[a-zA-Z0-9]{3,}$/.test(username || "");
  }
};
const validate_password = (password) => {
  if (password && typeof password === "string") {
    return /^((?=.*\d)(?=.*[A-Z])(?=.*[\W]).{6,30})$/.test(password || "");
  }
};
const generate_token = (data, secret_key, expireTime) => {
  if (typeof expireTime === "number" && typeof data === "object") {
    return jwt.sign(data, secret_key, {
      expiresIn: `${expireTime}s`,
    });
  } else {
    console.log(typeof expireTime);
    return null;
  }
};
const generate_password_hash = (password) => {
  if (password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  } else {
    return "";
  }
};
const setTokenCookie = (responseObject, token, maxAgeinSeconds) => {
  responseObject.cookie("token", token, {
    httpOnly: true,
    maxAge: maxAgeinSeconds * 1000,
    path: "/",
    domain: "localhost",
  });
  return responseObject;
};
const format_token = (token) => {
  return { token: token };
};

module.exports = {
  validate_username: validate_username,
  validate_password: validate_password,
  generate_token: generate_token,
  generate_password_hash: generate_password_hash,
  setTokenCookie: setTokenCookie,
  format_token: format_token,
  verifyToken: verifyToken,
};
