"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Method to hash the password before saving
    async hashPassword() {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
      }
    }

    // Method to check if the provided password matches the hashed password
    async validatePassword(password) {
      return bcrypt.compare(password, this.password);
    }

    // Method to get the user's full name
    getFullName() {
      return `${this.firstname} ${this.lastname}`;
    }

    // Method to generate a JWT token
    generateAuthToken() {
      const payload = { id: this.id, email: this.email };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    }

    // Method to check if the email format is valid
    static isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Method to check if the username is unique
    static async isUsernameUnique(username) {
      const user = await User.findOne({ where: { username } });
      return !user;
    }

    // Soft delete by setting an "active" flag to false
    // async softDelete() {
    //   this.active = false;
    //   await this.save();
    // }

    // Static method to find a user by their email
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
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        // Hook to hash the password before creating a user
        beforeCreate: async (user, options) => {
          await user.hashPassword();
        },
        // Hook to log a message after a user is created
        afterCreate: (user, options) => {
          console.log(`User ${user.getFullName()} created successfully!`);
        },
      },
    }
  );

  return User;
};
