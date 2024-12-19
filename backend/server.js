const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error(err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Mongoose schema
const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  experience: Array,
  projects: Array,
  education: Array,
  profileImage: String,
});

const Resume = mongoose.model("Resume", resumeSchema);

// POST route
app.post("/resume", upload.single("profileImage"), async (req, res) => {
  try {
    const { formData } = req.body;
    const parsedData = JSON.parse(formData);
    const newResume = new Resume({
      ...parsedData,
      profileImage: req.file.path,
    });

    await newResume.save();
    res.status(200).send({ message: "Resume saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving resume" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
