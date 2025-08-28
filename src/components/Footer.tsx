import React, { useEffect, useState } from "react";
import footerBg from "../assets/truck.jpg";
import logo from "../assets/iln logo (1).png";
import { FaLinkedin, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { HiPaperAirplane } from "react-icons/hi";

import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const socials = [
  {
    Icon: FaLinkedin,
    link: "https://www.linkedin.com/company/integrated-logistics-network/", // 🔗 replace with actual LinkedIn URL
  },
];

const Footer: React.FC = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (subscribeMessage) {
      const timer = setTimeout(() => setSubscribeMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [subscribeMessage]);

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(subscriberEmail)) {
      setSubscribeMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${baseURL}/subscribe`, {
        email: subscriberEmail,
      });

      setSubscribeMessage({
        text: "Subscribed successfully!",
        type: "success",
      });

      setSubscriberEmail("");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setSubscribeMessage({
          text: "You are already subscribed.",
          type: "error",
        });
      } else {
        setSubscribeMessage({
          text: "Subscription failed. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative text-white overflow-hidden">
      <img
        src={footerBg}
        alt="footer background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 px-4 sm:px-8 py-16 max-w-7xl mx-auto space-y-12">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Subscribe Newsletter</h2>
            <hr className="w-20 border-[var(--primary-color)] border-b-2" />
          </div>

          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 border-b border-white/30">
              <input
                type="email"
                placeholder="Enter your mail id"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="bg-transparent text-white placeholder-white w-full outline-none"
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="relative z-10 text-[var(--primary-color)] p-2 rounded"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-6 w-6 text-[var(--primary-color)]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  <HiPaperAirplane className="text-3xl rotate-90" />
                )}
              </button>
            </div>

            {subscribeMessage && (
              <p
                className={`mt-2 text-sm ${
                  subscribeMessage.type === "error"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {subscribeMessage.text}
              </p>
            )}
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-10 text-sm items-center">
          {/* Logo & Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="Logo" className="w-60 " />
            </div>
          </div>

          {/* Footer Links */}

          <div>
            {/* <h3 className="font-bold text-xl mb-3">Services</h3>
            <ul className="space-y-2 text-gray-200">
              <li>Track & Trace</li>
              <li>Incoterms</li>
              
            </ul> */}
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <a href="/membership">Membership Verticals</a>
              </li>
              <li>
                <a href="/contact">Get In Touch</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-white">
            <a
              href="mailto:info@integratedlognet.com"
              className="flex items-center hover:text-[var(--primary-color)] transition-colors"
            >
              <FaEnvelope className="mr-2 text-lg text-[var(--primary-color)]" />
              info@integratedlognet.com
            </a>
            <div className="flex items-start">
              <FaLocationDot className="mr-2 text-lg text-[var(--primary-color)]" />
              <p>
                Unit 1112, 11/F, Wing On Plaza <br /> 62, Mody Road,
                <br />
                Tsim Sha Tsui East, Kowloon <br /> Hong Kong
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center text-sm border-t border-white/20 pt-6">
          <p className="text-gray-300 mb-4 sm:mb-0">
            © 2025 Integrated Logistics Network All rights reserved
          </p>

          <a
            href="https://www.bigwigdigital.in/"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-[var(--primary-color)] px-4 uppercase text-sm tracking-widest text-center transition-colors  "
          >
            Made & Marketed by Bigwig Digital
          </a>

          <div className="flex gap-4 mb-8">
            {socials.map(({ Icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <Icon className="dark:text-white text-[var(--primary-color)] text-3xl cursor-pointer dark:hover:text-[var(--primary-color)]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
