const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { api, codes } = require("./api");
const database = require("./database");
const security = require("./security.js");
const { generate_password_hash } = require("./security.js");

const server = express();
const ignoredUrl = [api.createUser, api.signIn];

server.use(express.json());
server.use(cookieparser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

//Verify the authentication for the request
server.use((req, res, next) => {
	console.log(Date.now())
  const token = req?.cookies?.token;
  if (ignoredUrl?.indexOf(req.path) >= 0) {
    next();
  } else {
    if (token) {
      security
        .verifyToken(token)
        .then((data) => {
          req.id = data?.token;

          next();
        })
        .catch((error) => {
          res.status = 200;
          res.send(
            resFormat(codes.invalidToken, "Token could not be validated")
          );
        });
    } else {
      res.status = 200;
      res.send(resFormat(codes.invalidToken, "Token could not be validated"));
    }
  }
});

const validTimeinSeconds = 21600;

server.post(api.createUser, async (req, res) => {
  const data = req.body;
  if (data) {
    if (security.validate_username(data.username)) {
      if (security.validate_password(data.password)) {
        const hash = generate_password_hash(data.password);
        database
          .createUser(data.username, hash, data.profilePicture)
          .then((user) => {
            const token = security.generate_token(
              { id: user["_id"] },
              process.env.SECRET_KEY,
              validTimeinSeconds
            );
            res = security.setTokenCookie(res, token, validTimeinSeconds);
            res.send(resFormat(codes.sucess, user));
          })
          .catch((err) => {
            res.send(resFormat(codes.userCreationError, err));
          });
      } else {
        res.send(resFormat(codes.weakPassword, "Password is too weak"));
      }
    } else {
      res.send(
        resFormat(
          codes.weakUsername,
          "Username must be atleast 3 characters long"
        )
      );
    }
  } else {
    res.send(resFormat(codes.internalServerError, "Processing Error"));
  }
});

//REST API for user Login
server.post(api.signIn, (req, res) => {
  const data_ = req.body;
  const password_hash = security.generate_password_hash(data_?.password);
  database
    .getUser(data_?.username, password_hash)
    .then((data) => {
      if (data?._id) {
        if (data?.password?.toLowerCase() === password_hash.toLowerCase()) {
          const token = security.generate_token(
            security.format_token(data._id),
            process.env.SECRET_KEY,
            validTimeinSeconds
          );
          security.setTokenCookie(res, token, validTimeinSeconds);
          res.send(
            resFormat(codes.sucess, {
              username: data.username,
              profilePicture: data.profilePicture,
            })
          );
        } else {
          res.send(resFormat(codes.incorrectPassword, "Invalid Credentials"));
        }
      } else {
        res.send(resFormat(codes.incorrectUsername, "Invalid Credentials"));
      }
    })
    .catch((err) => {
      res.send(
        resFormat(codes.internalServerError, "Error occured while processing")
      );
    });
});

//API to add component
server.post(api.createComponent, (req, res) => {
  const reqdata = req.body;
  if (reqdata) {
    database
      .addnewComponent(req.id, reqdata.name, reqdata.code)
      .then((data) => {
        if (data) {
          const new_data = {
            id: data._id,
            componentName: data.name,
            lastUpdated: data.updatedAt,
          };
          res.send(resFormat(codes.sucess, data));
        } else {
          res.send(resFormat(codes.internalServerError));
        }
      })
      .catch((error) => {
        console.log(error);
        res.send(resFormat(codes.internalServerError));
      });
  }
});

server.get(api.getAllComponents, async (req, res) => {
  database
    .getAllComponents(req.id)
    .then((data) => {
      var new_data = [];
      data.forEach((value) => {
        new_data.push({
          id: value._id,
          name: value.name,
          code: value.code,
          lastUpdated: value.updatedAt,
        });
      });
      res.send(resFormat(codes.sucess, new_data));
    })
    .catch((error) => {
      res.send(error);
    });
});
server.get(api.getapi, async (req, res) => {
  if (api) {
    res.send(resFormat(codes.sucess, api));
  } else {
    res.send(resFormat(codes.internalServerError, {}));
  }
});
server.get("/", (req, res) => {
  if (api) {
    res.send(resFormat(codes.sucess, api.createUser));
  } else {
    res.send(resFormat(codes.internalServerError, {}));
  }
});

database.init().then(
  () => {
    server.listen(process.env.PORT || 3001, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Port :${process.env.PORT || 3001}`);
      }
    });
  },
  () => {
    console.error("Unable to connect to the database system");
  }
);

const resFormat = (code, data) => {
  return {
    code: code,
    data: data,
  };
};
