const { User } = require("../models");
const { sendEmail, requestDemoTemplate, orderUpdateTemplate } = require("../utils/email");

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, username, password, email, role } = req.body;

    if ((role === "admin" || role === "author") && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create admin or author accounts." });
    }

    if (!(await User.isEmailUnique(email))) {
      return res.status(400).json({ message: "Email already in use." });
    }

    if (!(await User.isUsernameUnique(username))) {
      return res.status(400).json({ message: "Username already in use." });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password,
      email,
      role: role || "user",
    });

    res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


const requestDemoMail = async (req, res) => {
  try {
    const {firstName, lastName, email, phoneNumber, age, language} = req.body;
    if (!email || !phoneNumber || !language) {
      return res.status(403).json({ message: "Please fill out the required fields." });
    }
    await sendEmail('kawal.singh@hindustanitongue.com', 'Demo Request', requestDemoTemplate(firstName, lastName, email, phoneNumber, age, language));
    res.status(200).json({
      success: true,
      message: `message sent succesfully `,
    });
  } catch (error) {
    return res.status(403).json({ message: `error ${error.message}` });
  }
}

module.exports = { createUser, requestDemoMail };
