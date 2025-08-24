import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Events from "./Pages/Events";
import OurTeam from "./Pages/OurTeam";
import NewMemberForm from "./Pages/NewMember";
import ContactForm from "./Pages/ContactUs";
import AnnouncementsPage from "./Pages/Announcements";
import AnnouncementForm from "./Pages/Announcement_Form";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#140b29]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/member" element={<OurTeam />} />
          <Route path="/member/newMember" element={<NewMemberForm />} />
          <Route path="/contactUs" element={<ContactForm />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/admin_only/onlyteams" element={<AnnouncementForm />} />
          
          {/* <Route path="/about" element={<About />} /> */}
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
