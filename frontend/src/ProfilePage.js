import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data from the backend or local storage
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile"); // Assuming the backend returns profile data
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700">Profile Details</h2>
      <div className="space-y-4 mt-6">
        <div>
          <strong>Name: </strong>
          <span>{profileData.name}</span>
        </div>
        <div>
          <strong>Email: </strong>
          <span>{profileData.email}</span>
        </div>
        <div>
          <strong>Phone: </strong>
          <span>{profileData.phone}</span>
        </div>
        <div>
          <strong>Address: </strong>
          <span>{profileData.address}</span>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
        {profileData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <p><strong>Company:</strong> {exp.company}</p>
            <p><strong>Position:</strong> {exp.position}</p>
            <p><strong>Start Year:</strong> {exp.startYear}</p>
            <p><strong>End Year:</strong> {exp.endYear}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
        {profileData.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <p><strong>Project Name:</strong> {project.name}</p>
            <p><strong>Project Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Education</h3>
        {profileData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <p><strong>Year:</strong> {edu.year}</p>
            <p><strong>Course:</strong> {edu.course}</p>
            <p><strong>Studying:</strong> {edu.studying ? "Yes" : "No"}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Profile Image</h3>
        {profileData.profileImage ? (
          <img src={profileData.profileImage} alt="Profile" className="w-32 h-32 rounded-full" />
        ) : (
          <p>No profile image uploaded</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
