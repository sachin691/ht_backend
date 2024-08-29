"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Blog, { foreignKey: "userId", onDelete: "CASCADE" });
    }
    
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
      }
    }

    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    getFullName() {
      return `${this.firstname} ${this.lastname}`;
    }

    generateAuthToken() {
      const payload = { id: this.id, email: this.email, role: this.role };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    static isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    static async isUsernameUnique(username) {
      const user = await User.findOne({ where: { username } });
      return !user;
    }

    static async isEmailUnique(email) {
      const user = await User.findOne({ where: { email } });
      return !user;
    }

    static async findByEmail(email) {
      return User.findOne({ where: { email } });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      hooks: {
        beforeCreate: async (user, options) => {
          await user.hashPassword();
        },
        afterCreate: (user, options) => {
          console.log(`User ${user.getFullName()} created successfully!`);
        },
      },
    }
  );

  return User;
};
