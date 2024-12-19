const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // File name with timestamp
  },
});
const upload = multer({ storage });

// MongoDB schema for resume data
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

// Route for submitting resume data
app.post("/resume", upload.single("profileImage"), async (req, res) => {
  try {
    console.log("Received formData:", req.body.formData); // Debugging the formData
    console.log("Received file:", req.file); // Debugging the file

    const { formData } = req.body;
    const parsedData = JSON.parse(formData);

    const newResume = new Resume({
      ...parsedData,
      profileImage: req.file ? req.file.path : "", // Ensuring file is handled
    });

    await newResume.save();
    res.status(200).send({ message: "Resume saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving resume" });
  }
});

// Route to fetch the latest profile data (You can replace with MongoDB data retrieval later)
app.get("/profile", async (req, res) => {
  try {
    const profile = await Resume.findOne().sort({ _id: -1 }).limit(1); // Get the latest resume

    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
