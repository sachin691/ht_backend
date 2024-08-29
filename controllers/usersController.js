const { User } = require("../models");

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, username, password, email } = req.body;
    if (!(await User.isEmailUnique(email))) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (!(await User.isUsernameUnique(username))) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password,
      email,
    });
    
    res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
 

module.exports = { createUser };
