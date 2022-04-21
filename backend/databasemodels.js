const mongoose = require("mongoose");

const userDbName = "users";
const componentsDbName = "components";

const userStructure = {
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  profilePicture: { type: String, required: false },
};
const ComponentDesignStructure = {
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userDbName,
  },
  name: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Number },
  updatedAt: { type: Number },
};

const getFormattedUserStructure = (username, password, profilePicture) => {
  return {
    username: username,
    password: password,
    profilePicture: profilePicture,
  };
};
const getFormattedComponentStructure = (userid, name, code) => {
  return {
    userid: new mongoose.Types.ObjectId(userid),
    code: code,
    name: name,
  };
};
const DatabaseName = "compdesign";
const DatabaseUrl = "mongodb://127.0.0.1:27017/";
function getUserSchema() {
  return new mongoose.Schema(userStructure);
}
function getComponentDesignSchema() {
  return new mongoose.Schema(ComponentDesignStructure, {
    timestamps: { currentTime: () => Date.now() },
  });
}

module.exports = {
  getFormattedUserStructure: getFormattedUserStructure,
  getFormattedComponentStructure: getFormattedComponentStructure,
  DatabaseName: DatabaseName,
  DatabaseUrl: DatabaseUrl,
  getUserSchema: getUserSchema,
  getComponentDesignSchema: getComponentDesignSchema,
  userDbName: userDbName,
  componentsDbName: componentsDbName,
};
