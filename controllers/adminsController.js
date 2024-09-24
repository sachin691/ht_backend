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

const getLanguage = async (req, res) => {
  try {
    const { name } = req.params;

    const language = await Language.findOne({ where: { name } });

    if (!language) {
      return res.status(404).json({ error: "Language not found" });
    }
    return res.status(200).json(language);
  } catch (error) {
    console.error("Error fetching language:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


module.exports = { createLanguage, getLanguage };
