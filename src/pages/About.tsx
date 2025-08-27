import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../assets/ILN_logo-01.png";
// import img2 from "../assets/Untitled design (13).png";
import AOS from "aos";
import "aos/dist/aos.css";
import JoinFormPopup from "../components/JoinForm";
import { FaSearch, FaLock, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import hero from "../assets/About Us Banner.png";

const keyFeatures = [
  {
    icon: <FaSearch />,
    title: "Comprehensive Directory",
    desc: "Easily search for logistics providers by service, location, specialization, and more.",
  },
  {
    icon: <FaLock />,
    title: "Secure Messaging",
    desc: "Communicate with other members securely and efficiently to facilitate seamless collaboration.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Event Calendar",
    desc: "Stay informed about upcoming industry events and networking opportunities to expand your professional network.",
  },
  {
    icon: <FaBookOpen />,
    title: "Resource Library",
    desc: "Access a wealth of information, including white papers, webinars, and industry news to stay ahead of the curve.",
  },
];

const AboutPage: React.FC = () => {
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
    <div>
      <Navbar />
      <section className="text-[#111] dark:text-white font-raleway bg-[--bg-color2] dark:bg-[--bg-color1]">
        {/* Hero Section */}
        <div className="relative h-full w-full overflow-hidden">
          <img src={hero} alt="About Hero" className="w-full h-full " />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-light text-white drop-shadow-lg">
              About Us
            </h1>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="w-11/12 md:w-5/6 mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
          {/* Section 1: Integrated Logistics Network */}

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Text Content */}
            <div data-aos="fade-right">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] uppercase mb-6">
                Integrated Logistics Network
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                The Integrated Logistics Network (ILN) is a powerful platform
                designed to connect logistics professionals worldwide. It's more
                than just a directory—it’s a thriving global community where
                businesses collaborate, innovate, and grow.
              </p>

              <h3 className="text-lg font-semibold mb-4">What ILN Offers:</h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Find Reliable Partners",
                    desc: "Discover a curated network of vetted freight forwarders, customs brokers, and logistics providers across the globe.",
                  },
                  {
                    title: "Build Meaningful Connections",
                    desc: "Network with peers, share best practices, and create collaborations that drive mutual success.",
                  },
                  {
                    title: "Access Exclusive Resources",
                    desc: "Tap into industry insights, market intelligence, and tools to optimize operations and gain a competitive edge.",
                  },
                  {
                    title: "Expand Your Global Reach",
                    desc: "Explore new markets, identify potential partnerships, and grow your business globally.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2"
                    data-aos="fade-right"
                    data-aos-delay={index * 200}
                  >
                    <span className="text-[var(--primary-color)] text-lg mt-1">
                      ✓
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {!user && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-8 w-fit px-5 bg-[var(--primary-color)] text-white font-semibold py-3 rounded-tl-2xl rounded-br-2xl hover:bg-opacity-90 transition"
                >
                  Join the ILN Community
                </button>
              )}
            </div>

            {/* Right Image */}
            <div
              className="rounded-lg overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src={img1}
                alt="ILN Network"
                className="w-full h-auto object-contain dark:invert"
              />
            </div>
          </div>

          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
              Your Gateway to Global Logistics
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Unlock powerful tools and services to elevate your logistics
              business.
            </p>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--bg-color1)] rounded-xl shadow-md hover:shadow-xl dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all p-6 text-center flex flex-col items-center"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-md mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Section 2: Founder */}
          {/* <div className=" p-10 rounded-xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <img
                  src={img2}
                  alt="Founder Image"
                  className="rounded-lg  w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] uppercase mb-4">
                  Rohinton Bilimoria : Founder
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Throughout my 40+ year career in the global supply chain, I've
                  consistently driven growth and navigated complex operational
                  challenges for major industry players. This journey, spanning
                  Asia, Europe, the Americas, and the MENA region, across
                  companies of all sizes, has given me a deep understanding of
                  corporate best practices and the critical importance of
                  strong, collaborative networks.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My passion lies in building high-performing teams and
                  fostering mutually beneficial relationships. I believe that a
                  strong ethical foundation, coupled with a tireless work ethic
                  and a genuine commitment to excellence, are essential for
                  success in today's dynamic business landscape.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  These principles have been the guiding force behind the
                  creation of the ILN Community. My vision for ILN is to provide
                  a platform for logistics professionals worldwide to connect,
                  collaborate, and thrive. I am confident that by fostering a
                  supportive and collaborative environment, we can unlock the
                  full potential of the global logistics network.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <Footer />
      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default AboutPage;
