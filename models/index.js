"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;

try {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: console.log, // Enable logging to debug issues
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
} catch (error) {
  console.error("Error initializing Sequelize:", error);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Set up associations, make sure models are defined before setting associations
if (db.User) db.User.associate(db);
if (db.Blog) db.Blog.associate(db);
if (db.BlogImage) db.BlogImage.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
