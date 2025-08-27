import {
  FaTruck,
  FaSnowflake,
  FaBoxOpen,
  FaPlaneDeparture,
  FaGasPump,
  FaPalette,
  FaPeopleCarry,
  FaGlobe,
  FaIndustry,
} from "react-icons/fa";

import img1 from "../assets/1664820885.webp";
import img2 from "../assets/MSC17013895.webp";
import img3 from "../assets/Blog_Image_International_Port_Ship_Vessel_Containers_Ocean_5.jpg";
import img4 from "../assets/aircraft-on-ground-001-1024x594.jpg";
import img5 from "../assets/Heathrow35-1024x652.jpg";

const verticalData = [
  {
    title: "Freight Forwarding & Customs Brokers",
    description:
      "Join a global logistics network to compete with integrators and multinationals through freight forwarding and customs expertise.",
    icon: <FaTruck />,
    image: img1,
  },
  {
    title: "Supply Chain",
    description:
      "Connect with supply chain professionals across multiple industries delivering scalable, resilient, and agile logistics solutions.",
    icon: <FaIndustry />,
    image: img2,
  },
  {
    title: "Cold Chain – Pharma & Perishables",
    description:
      "Specialized 3PL cold chain handlers for temperature-sensitive pharma and perishable goods logistics, globally certified.",
    icon: <FaSnowflake />,
    image: img3,
  },
  {
    title: "E-commerce & Express Handlers",
    description:
      "Empowering last-mile and express delivery experts to meet growing e-commerce and global trade demands efficiently.",
    icon: <FaBoxOpen />,
    image: img4,
  },
  {
    title: "Aerospace and AOG",
    description:
      "Supporting aircraft-on-ground logistics and aerospace supply chain with 24/7 specialized operations.",
    icon: <FaPlaneDeparture />,
    image: img5,
  },
  {
    title: "Fine Art & Antiques Logistics",
    description:
      "Trusted art logistics partners handling precious artwork, antiques, and heritage items with care and confidentiality.",
    icon: <FaPalette />,
    image: img5,
  },
  {
    title: "Professional Packers & Movers – Relocations",
    description:
      "Connecting global movers with experience in corporate and personal relocations for seamless international shifting.",
    icon: <FaPeopleCarry />,
    image: img5,
  },
  {
    title: "Events & Exhibition Handlers",
    description:
      "End-to-end solutions for event logistics, exhibition freight, and handling complex, time-sensitive show deliveries.",
    icon: <FaGlobe />,
    image: img5,
  },
  {
    title: "Oil & Gas and Renewable Energy",
    description:
      "Reliable logistics for energy projects — from heavy equipment for oil rigs to renewable infrastructure supply.",
    icon: <FaGasPump />,
    image: img5,
  },
];

export default function Services() {
  return (
    <section className="bg-white dark:bg-[var(--secondary-color)] text-[var(--secondary-color)] dark:text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="md:col-span-2">
          <p className="text-sm uppercase text-[var(--primary-color)]">
            Membership
          </p>
          <h2 className="text-4xl font-bold leading-tight mt-2 mb-6">
            Industries We Empower
          </h2>
          {/* Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticalData.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--bg-color1)] rounded-xl shadow-md hover:shadow-xl dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all p-6 text-center flex flex-col items-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl text-[var(--primary-color)]">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
