const api = {
  domain: "http://127.0.0.1:3001",
  signIn: "/signIn",
  authenticate: "/authenticate",
  getapi: "/getapis",
  createUser: "/createUser",
  createComponent: "/createComponent",
  getAllComponents: "/getAllComponents",
  getlastComponentUpdateTime: "/getlastComponentUpdateTime",
};
const codes = {
  sucess: 200,
  incorrectUsername: 201,
  incorrectPassword: 202,
  weakPassword: 203,
  weakUsername: 204,
  userCreationError: 205,
  internalServerError: 500,
  componentCreationError: 301,
  invalidToken: 10,
};
const dbCodes = {
  duplicateContent: 100,
  unknownError: 404,
  databaseError: 202,
};
module.exports = { api: api, codes: codes, dbCodes: dbCodes };
