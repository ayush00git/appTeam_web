import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutUs from "./Pages/AboutUs";
import Events from "./Pages/Events";
import OurTeam from "./Pages/OurTeam";
import NewMemberForm from "./Pages/NewMember";
import ContactForm from "./Pages/ContactUs";
import AnnouncementsPage from "./Pages/Announcements";
import AnnouncementForm from "./Pages/Announcement_Form";
import NotFound from "./Pages/NotFound";
import HomePage from "./Pages/HomePage";
import AdminOnly from "./components/AdminOnly";
import Projects from "./Pages/Projects";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#140b29]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/member" element={<OurTeam />} />
          <Route path={`/member/admin_only/newMember/${import.meta.env.VITE_ROUTE_SECRET}`} element={<NewMemberForm />} />
          <Route path="/contactUs" element={<ContactForm />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path={`/announcements/admin_only/${import.meta.env.VITE_ROUTE_SECRET}`} element={<AnnouncementForm />} />
          <Route path={'/member/admin_only/newMember'} element={<AdminOnly />}/>
          <Route path={'/announcements/admin_only'} element={<AdminOnly />}/>
          <Route path={'/projects'} element={<Projects />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
