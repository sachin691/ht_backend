const { User } = require("../models");
const { Language } = require("../models");

const createLanguage = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Access denied. Only admins can create languages." });
    // }

    const { name, aboutThisCourse, ourMethod, whatYoullLearn, requirements } = req.body;

    const existingLanguage = await Language.findOne({ where: { name } });
    if (existingLanguage) {
      return res.status(400).json({ message: "Language with this name already exists." });
    }

    const newLanguage = await Language.create({
      name,
      aboutThisCourse,
      ourMethod,
      whatYoullLearn,
      requirements,
    });

    res.status(201).json({
      id: newLanguage.id,
      name: newLanguage.name,
      aboutThisCourse: newLanguage.aboutThisCourse,
      ourMethod: newLanguage.ourMethod,
      whatYoullLearn: newLanguage.whatYoullLearn,
      requirements: newLanguage.requirements,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createLanguage };
