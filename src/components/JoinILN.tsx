import {
  FaShieldAlt,
  FaGlobe,
  FaUsers,
  FaHandshake,
  FaProjectDiagram,
  FaCheckCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import JoinFormPopup from "./JoinForm";

export default function WhyJoinILN() {
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

  const benefits = [
    {
      icon: <FaShieldAlt />,
      title: "Enhanced Financial Security",
      points: [
        "Undergo rigorous Financial Due Diligence to establish your company's stability.",
        "Benefit from a unique Financial Protection Plan to mitigate risks.",
      ],
    },
    {
      icon: <FaUsers />,
      title: "Elite Networking",
      points: [
        "Participate in exclusive AGMs and events to build relationships.",
        "Use the ILN Scheduler to optimize your meetings at events.",
      ],
    },
    {
      icon: <FaGlobe />,
      title: "Global Market Access",
      points: [
        "Connect with a vetted network of reliable ILN members.",
        "Explore new markets with partners who know the terrain.",
      ],
    },
    {
      icon: <FaHandshake />,
      title: "Professional & Social Growth",
      points: [
        "Foster trusted relationships in the logistics community.",
        "Collaborate in a culture of respect and shared success.",
      ],
    },
    {
      icon: <FaProjectDiagram />,
      title: "Project Efficiency",
      points: [
        "Work with dependable partners worldwide to ensure smooth project execution.",
      ],
    },
  ];

  return (
    <section className="py-16 bg-[var(--bg-color2)] dark:bg-[var(--bg-color1)] transition-colors font-['PT_Serif'] text-[var(--secondary-color)] dark:text-white">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-3">
            What Happens When You Join ILN?
          </h2>
          <p className="text-md text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            ILN membership opens doors to global partnerships, operational
            efficiency, and trusted logistics collaborations—backed by robust
            financial safety nets and exclusive networking opportunities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Benefits (2 columns inside) */}
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white dark:bg-[var(--secondary2-color)] rounded-xl shadow-md px-6 py-4 flex flex-col gap-3 hover:shadow-lg transition"
              >
                <div className="flex gap-5">
                  <div className="text-[var(--primary-color)] text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <div></div>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 pl-2">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Summary Box */}
          <div
            className="bg-white dark:bg-[var(--secondary2-color)] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col justify-between"
            data-aos="zoom-in"
          >
            <div>
              <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-6">
                ILN membership provides a platform for businesses to:
              </h3>
              <ul className="space-y-5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-3">
                  <FaCheckCircle className="text-[var(--primary-color)] mt-1 text-xl" />
                  <span>
                    <strong>Reduce risk:</strong> Through robust financial
                    safeguards and access to a trusted network of partners.
                  </span>
                </li>
                <li className="flex gap-3">
                  <FaCheckCircle className="text-[var(--primary-color)] mt-1 text-xl" />
                  <span>
                    <strong>Expand global footprint:</strong> By connecting with
                    businesses operating in diverse markets.
                  </span>
                </li>
                <li className="flex gap-3">
                  <FaCheckCircle className="text-[var(--primary-color)] mt-1 text-xl" />
                  <span>
                    <strong>Enhance operations:</strong> Streamlined processes,
                    efficient project execution, and valuable insights.
                  </span>
                </li>
                <li className="flex gap-3">
                  <FaCheckCircle className="text-[var(--primary-color)] mt-1 text-xl" />
                  <span>
                    <strong>Build lasting relationships:</strong> Within a
                    global community of trusted logistics professionals.
                  </span>
                </li>
              </ul>
            </div>
            {!user && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-8 w-full bg-[var(--primary-color)] text-white font-semibold py-3 rounded-tl-2xl rounded-br-2xl hover:bg-opacity-90 transition"
              >
                Join the ILN Community
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form Popup */}
      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
