// App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MembershipVerticals from "./pages/MembershipVerticals";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Newsfeed from "./pages/Newsfeed";
import Blog from "./pages/Blogs";
import AdminPage from "./Admin/AdminPage";
import BlogDetails from "./pages/BlogDetails";
import OfferPopup from "./components/OfferPopup";
import Agm from "./pages/Agm";
import ForgotPassword from "./components/ForgotPassword";
import AdminLogin from "./pages/AdminLogin";
import { Mail } from "lucide-react";
import JoinFormPopup from "./components/JoinForm";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import CookieConsent from "react-cookie-consent";

// 👇 Add this import
// import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ScrollToTopButton from "./components/ScrollToTop";
import NewsletterForm from "./pages/Newsletter";
import Emailer from "./pages/Emailer";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import DirectoryDetails from "./pages/DirectoryDetails";
import JoinFormPage from "./components/JoinFormPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/membership" element={<MembershipVerticals />} />
        <Route path="/become-a-member" element={<JoinFormPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/agm" element={<Agm />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/member/:id" element={<DirectoryDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/newsletter" element={<NewsletterForm />} />
        <Route path="/emailer" element={<Emailer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        {/* 🔒 Protected Route for Admin Page */}
        <Route path="/adminPage" element={<AdminPage />} />
      </Routes>

      {/* Mobile Floating Buttons */}
      <div className="fixed bottom-0 left-0 w-full z-50 flex md:hidden">
        <a
          href="mailto:info@integratedlognet.com"
          className="w-1/2 bg-[var(--primary-color)] text-white text-center py-4 font-semibold flex items-center justify-center gap-2"
        >
          <Mail size={20} />
          Email Us
        </a>

        <button
          onClick={() => setShowForm(true)}
          className="w-1/2 bg-[var(--secondary-color)] text-white text-center py-4 font-semibold flex items-center justify-center gap-2"
        >
          <FaUserPlus size={20} />
          Become a Member
        </button>
      </div>

      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
      <OfferPopup />
      <ScrollToTopButton />
      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Deny"
        enableDeclineButton
        cookieName="mySiteCookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          background: "#4CAF50",
          color: "#fff",
          padding: "8px 16px",
        }}
        declineButtonStyle={{
          background: "#f44336",
          color: "#fff",
          padding: "8px 16px",
        }}
        expires={150}
        onAccept={() => {
          console.log("User accepted cookies");
        }}
        onDecline={() => {
          console.log("User declined cookies");
        }}
      >
        We use cookies to enhance your browsing experience. Read our{" "}
        <a href="#" style={{ color: "#61dafb" }}>
          Privacy Policy
        </a>
        .
      </CookieConsent>
    </Router>
  );
}

export default App;
