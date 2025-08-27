import { useEffect, useState } from "react";
import aboutImage from "../assets/303e5955fa99dd84c83c37496a3de2a9.jpg";
import { FaShieldAlt, FaUsers, FaRocket } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import JoinFormPopup from "./JoinForm";

export default function About() {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid login data:", err);
      }
    }
  }, []);

  return (
    <div className="bg-[var(--bg-color2)] dark:bg-[var(--bg-color1)] transition-colors py-12">
      <section className="w-5/6 mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2" data-aos="fade-right">
          <img
            src={aboutImage}
            alt="About ILN"
            className="w-full rounded-2xl"
          />
        </div>

        {/* Right Side Text Content */}
        <div
          className="w-full md:w-1/2 text-center md:text-left"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-[var(--secondary-color)] dark:text-white mb-4">
            Introducing the Integrated Logistics Network (ILN){" "}
          </h2>
          <p className="text-md text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            The Integrated Logistics Network (ILN) is a thriving community
            empowering independent and medium-sized freight forwarders and
            logistics companies. We foster a secure and reliable environment
            where you can connect with a global network of professionals, access
            essential risk mitigation services, and leverage cutting-edge
            technology to streamline your operations.
          </p>

          {/* Bullet Points / Features */}
          <ul className="space-y-4 text-left">
            <li
              className="flex items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaUsers className="text-[var(--primary-color)] text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                Build valuable connections: Network with fellow professionals
                worldwide, expanding your reach and finding trusted partners.
              </span>
            </li>
            <li
              className="flex items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaShieldAlt className="text-[var(--primary-color)] text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                Mitigate risk: Access essential services like financial
                protection and comprehensive cargo insurance.
              </span>
            </li>
            <li
              className="flex items-start gap-3"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <FaRocket className="text-[var(--primary-color)] text-xl mt-1" />
              <span className="text-gray-700 dark:text-gray-300">
                Drive innovation: Leverage cutting-edge technology and solutions
                to streamline your operations and gain a competitive edge.
              </span>
            </li>
          </ul>

          {!user && (
            <div data-aos="zoom-in" data-aos-delay="1000">
              <button
                onClick={() => setShowForm(true)}
                className="mt-8 bg-[var(--primary-color)] text-white px-8 py-3 rounded-tl-2xl rounded-br-2xl font-semibold transition hover:opacity-90"
              >
                Join the ILN Community
              </button>
            </div>
          )}
        </div>
      </section>
      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
