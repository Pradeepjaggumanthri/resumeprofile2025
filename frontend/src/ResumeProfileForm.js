import React, { useState } from "react";
import axios from "axios";

const ResumeProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    experience: [{ company: "", startYear: "", endYear: "", position: "" }],
    projects: [{ name: "", link: "" }],
    education: [{ year: "", course: "", studying: false }],
  });

  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (index, field, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleAddField = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], {}],
    });
  };

  const handleRemoveField = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profileImage", profileImage);
    data.append("formData", JSON.stringify(formData));

    try {
      const response = await axios.post("http://localhost:5000/resume", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Submission failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Resume Profile Form</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
      </div>

      <section>
        <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "company", e.target.value, "experience")}
            />
            <input
              type="text"
              placeholder="Start Year"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "startYear", e.target.value, "experience")}
            />
            <input
              type="text"
              placeholder="End Year"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "endYear", e.target.value, "experience")}
            />
            <input
              type="text"
              placeholder="Position"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "position", e.target.value, "experience")}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "experience")}
              className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("experience")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Experience
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "name", e.target.value, "projects")}
            />
            <input
              type="url"
              placeholder="Project Link"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "link", e.target.value, "projects")}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, "projects")}
              className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("projects")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Project
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Year"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "year", e.target.value, "education")}
            />
            <input
              type="text"
              placeholder="Course"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => handleNestedChange(index, "course", e.target.value, "education")}
            />
            <label className="flex items-center">
              Studying:
              <input
                type="checkbox"
                onChange={(e) => handleNestedChange(index, "studying", e.target.checked, "education")}
                className="ml-2"
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveField(index, "education")}
              className="col-span-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField("education")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Education
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-700">Profile Image</h3>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </section>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
      {message && <p className="text-center text-green-500">{message}</p>}
    </form>
  );
};


export default ResumeProfileForm;
