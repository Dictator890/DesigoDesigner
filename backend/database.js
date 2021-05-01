const mongoose = require("mongoose");
const { dbCodes } = require("./api");
const {
  getUserSchema,
  getComponentDesignSchema,
  DatabaseUrl,
  DatabaseName,
  getFormattedUserStructure,
  getFormattedComponentStructure,
  userDbName,
  componentsDbName,
} = require("./databasemodels");

var usermodel;
var componenetmodel;
function initmodels() {
  try {
    usermodel = new mongoose.model(userDbName, getUserSchema());
    componenetmodel = new mongoose.model(
      componentsDbName,
      getComponentDesignSchema()
    );
  } catch (e) {
    console.error(e);
  }
}
async function init() {
  console.log(`${DatabaseUrl}${DatabaseName}`);
  let connection = await mongoose.connect(`${DatabaseUrl}${DatabaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes:true
  });
  return new Promise((resolve, reject) => {
    if (connection) {
      initmodels();
      resolve();
    } else {
      reject();
    }
  });
}
async function createUser(username, password, profileString) {
  var model = new usermodel(
    getFormattedUserStructure(username, password, profileString)
  );
  try {
    let result = await model.save();
    return Promise.resolve(result._doc);
  } catch (error) {
    console.log(Object.keys(error));
    Promise.reject(mongoErrortodatabaseError(error.code));
  }
}
async function getUser(username) {
  try {
    const result = await usermodel.findOne({
      username: username,
    });
    return Promise.resolve(result?._doc);
  } catch (error) {
    return Promise.reject(mongoErrortodatabaseError(error.code));
  }
}
async function addnewComponent(userid, name, code) {
  var model = new componenetmodel(
    getFormattedComponentStructure(userid, name, code)
  );
  try {
    let result = await model.save();
    return Promise.resolve(result._doc);
  } catch (error) {
    console.log(error);
    return Promise.reject(mongoErrortodatabaseError(error.code));
  }
}
async function getAllComponents(userId) {
  try {
    const data = await componenetmodel.find({ userid: userId });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(data);
  }
}
async function getComponentwhenUpdated(componentId) {
  try {
    console.log(componentId);
    const data = await componenetmodel.find({ _id: componentId });
    return Promise.resolve(data?.updatedAt);
  } catch (error) {
    return Promise.reject(data);
  }
}
const databaseErrorFormatter = (code, error, data) => {
  return { code: code || 0, error: error || "", data: data || {} };
};
function mongoErrortodatabaseError(code) {
  switch (code) {
    case 11000:
      databaseErrorFormatter(
        dbCodes.duplicateContent,
        "Duplicate Content Found"
      );

    default:
      databaseErrorFormatter(
        dbCodes.unknownError,
        "Error occured while processing"
      );
  }
}
module.exports = {
  init: init,
  createUser: createUser,
  getUser: getUser,
  addnewComponent: addnewComponent,
  getAllComponents: getAllComponents,
};
