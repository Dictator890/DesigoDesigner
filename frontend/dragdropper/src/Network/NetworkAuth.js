import axios from "axios";
const api = {
  domain: "http://localhost:3001",
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
/**
 *
 * @param {String} username
 * @param {String} password
 * @param {String} profilePicture
 * @returns A promise which contains a String if failure or object if sucess
 */
async function createNewUser(username, password, profilePicture) {
  if (typeof username === "string" && typeof password === "string") {
    try {
      const add_user = await axios.post(`${api.domain}${api.createUser}`, {
        username: username,
        password: password,
        profilePicture: profilePicture,
      });
      if (add_user?.data?.code === 200) {
        return Promise.resolve(add_user?.data.data);
      } else {
        return Promise.reject(add_user?.data.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject("Username and Password must be of string type");
  }
}
async function verifyUser(username, password) {
  if (typeof username === "string" && typeof password === "string") {
    try {
      const result = await axios.post(
        `${api.domain}${api.signIn}`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      if (result?.data?.code === 200) {
        return Promise.resolve(result.data.data);
      } else {
        return Promise.reject(result.data.data);
      }
    } catch (error) {
      console.log("Error");
      return Promise.reject(error);
    }
  }
}
async function createComponent(componentName, code) {
  if (typeof componentName === "string" || typeof code === "string") {
    const data = { name: componentName, code: code };
    try {
      const result = await axios.post(
        `${api.domain}${api.createComponent}`,
        data,
        { withCredentials: true }
      );
      if (result.data.code === codes.sucess) {
        return Promise.resolve(result.data.data);
      } else {
        return Promise.reject(result.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  } else {
    return Promise.reject();
  }
}

async function getComponents() {
  try {
    const result = await axios.get(`${api.domain}${api.getAllComponents}`, {
      withCredentials: true,
    });
    if (result.data.code === codes.sucess) {
      return Promise.resolve(result.data.data);
    } else {
      return Promise.reject(result.data.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
function setTokenCookie(token) {}
export { createNewUser, verifyUser, createComponent, getComponents };
