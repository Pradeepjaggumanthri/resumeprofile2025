import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeProfileForm from "./ResumeProfileForm";
import ProfilePage from "./ProfilePage";  // A page where you display the user's profile

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ResumeProfileForm />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </Router>
);

export default App;
