import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bannerImg from "../assets/Membership Banner.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineGlobeAlt,
  HiOutlineUsers,
  HiOutlineLockClosed,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineClipboardList,
  HiOutlineNewspaper,
  HiOutlineIdentification,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import Slider from "react-slick";
import JoinFormPopup from "../components/JoinForm";
import AOS from "aos";
import "aos/dist/aos.css";

interface Vertical {
  title: string;
  content: string;
}

const verticals: Vertical[] = [
  {
    title: "Freight Forwarding & Customs Brokers",
    content: `
      In today’s interconnected world, businesses are increasingly reliant on efficient and reliable global logistics. Freight Forwarders and Customs Brokers play a vital role in navigating the complexities of international trade, ensuring seamless movement of goods across borders.

      Leveraging a global network of partners, ILN empowers Freight Forwarders and Customs Brokers to:
      - Expand their global reach: Access new markets and customers worldwide.
      - Enhance service offerings: Collaborate with other members to provide comprehensive and integrated logistics solutions.
      - Gain a competitive edge: Compete effectively with global integrators and multinational corporations.

      ILN invites experienced Freight Forwarders and Customs Brokers to join our dynamic community and unlock a world of opportunities.
    `,
  },
  {
    title: "Contract Logistics & Supply Chain",
    content: `
      Boosting Global Competitiveness: Contract Logistics & Supply Chain:

      Warehousing excellence is paramount in today’s dynamic supply chains. Businesses increasingly rely on 3PL providers equipped with cutting-edge technology to streamline operations and gain a competitive edge.

      Key requirements for modern warehouses include:
      - Advanced Material Handling: Robust fleets of lift trucks, integrated AGV systems, and efficient conveyor systems.
      - Intelligent Inventory Management: Systematized racking solutions, sophisticated WMS automation, and real-time inventory tracking with RFID and AI.
      - Enhanced Security: Comprehensive CCTV surveillance and robust security protocols.

      ILN invites leading 3PL companies to collaborate with our global network of Member Partners. By leveraging the strengths of these partnerships, businesses can optimize their supply chains, reduce costs, and effectively compete with multinational giants in the global marketplace.
    `,
  },
  {
    title: "Cold Chain – Pharma & Perishables",
    content: `
      Cold Chain Logistics: Optimizing Pharma & Perishables Distribution:

      Food & Beverage and Healthcare companies face the critical challenge of maintaining the integrity of temperature-sensitive products throughout their global supply chains. This necessitates a robust and efficient Cold Chain logistics solution. To effectively focus on core business activities like forecasting, planning, and supply chain visibility, these companies increasingly rely on 3PL Cold Chain Logistics    providers.

      Leading 3PLs offer services like:
      - Inventory Optimization: Leveraging advanced Warehouse Management Systems (WMS) to minimize waste and maximize efficiency.
      - Transportation Management: Ensuring timely and secure delivery across various modes (air, sea, land).
      - Supply Chain Security: Implementing robust measures to safeguard products from theft, contamination, and other risks.
      - Corporate Social Responsibility: Adhering to environmental and ethical standards throughout the supply chain.

      ILN invites 3PL companies specializing in Cold Chain transportation, meeting the highest industry standards, to join their global platform and collaborate with Member Partners worldwide.
    `,
  },
  {
    title: "E-commerce & Express Handlers",
    content: `
      E-commerce & Express Handlers: Fueling Growth in a Rapidly Evolving Market:

      Express Handlers have become indispensable players in the thriving e-commerce landscape. The surge in online shopping has fueled a demand for faster, more efficient transportation and delivery of a diverse range of goods, including FMCG, perishables, and manufactured products. Modern technologies and innovative last-mile delivery services are revolutionizing the industry, enabling businesses to gain a competitive edge. These services are constantly evolving, driving companies to explore new strategies for enhancing efficiency and minimizing costs.

      ILN invites prominent express companies worldwide to leverage our global platform and cutting-edge last-mile delivery solutions to effectively meet the dynamic demands of the global e-commerce market.
    `,
  },
  {
    title: "Aerospace & AOG",
    content: `
    Ensuring Uninterrupted Operations: Aerospace & AOG Logistics:

    In the dynamic world of aerospace and aviation, timely and reliable logistics are paramount. The aerospace, defense, and their suppliers face the critical challenge of managing the flow of time-sensitive and often mission-critical components across global supply chains.

    ILN invites Aerospace and AOG Handlers with 24/7 operations to join our global platform. By collaborating with ILN, these specialized logistics providers can:
    - Enhance Operational Efficiency: Streamline supply chains, minimize downtime, and ensure 
      the uninterrupted operation of aircraft and defense systems.
    - Expand Global Reach: Connect with a wider network of aerospace and defense companies, 
      creating new opportunities for business growth.
    - Improve Customer Service: Deliver critical components with speed and reliability, 
      enhancing customer satisfaction and building strong relationships.

  `,
  },
  {
    title: "Fine Arts & Antiques Logistics",
    content: `
    Safeguarding Cultural Treasures: Fine Arts & Antiques Logistics:

    The transportation of fine art and antiques demands meticulous attention to detail and specialized expertise. These valuable and often irreplaceable items require:
    - Expert Handling: Trained professionals with a deep understanding of art handling techniques.
    - Custom Packaging: Bespoke packaging solutions designed to provide maximum protection during transit.
    - Climate-Controlled Environments: Maintaining optimal temperature and humidity levels to preserve the integrity of artworks.
    - Secure Transportation: Utilizing secure and reliable transportation methods to ensure the safe arrival of each piece.

    ILN invites specialized logistics companies with expertise in fine art and antiques transportation to join our global platform. By collaborating with ILN, these companies can:
    - Access a Global Network: Connect with art collectors, galleries, museums, and auction houses worldwide.
    - Showcase Their Expertise: Highlight their specialized services and build trust with potential clients.
    - Expand Their Business: Gain access to new opportunities and grow their presence in the global art market.
  `,
  },
  {
    title: "Professional Packers & Movers",
    content: `
    Seamless Global Relocations:

    In today’s interconnected world, people are constantly on the move. Whether it’s an international job transfer, a new employment opportunity, or a personal migration, relocation can be a complex and stressful experience.

    ILN invites professional relocation companies and skilled packing/packaging services to join our global platform. By collaborating with ILN, these companies can:
    - Connect with a Global Client Base: Access a wider network of individuals and families seeking relocation services.
    - Showcase Their Expertise: Highlight their specialized services, including packing of hazardous and dangerous goods, 
      event and exhibition logistics, and project and oilfield supplies.
    - Offer Integrated Solutions: Provide comprehensive relocation services, from initial consultation and packing/packaging 
      to final delivery and settling-in assistance.
    - Gain a Competitive Edge: Differentiate themselves in a competitive market by offering innovative and client-centric relocation solutions.
  `,
  },
  {
    title: "Events & Exhibition Logistics",
    content: `
    The global events industry is thriving, encompassing a diverse range of experiences from concerts and sporting events to trade shows and exhibitions. These dynamic events require meticulous planning and seamless execution to ensure success.

    ILN invites professional event and exhibition management companies to join our global platform. By collaborating with ILN, these companies can:
    - Connect with Global Clients: Access a wider network of event organizers, venues, and exhibitors worldwide.
    - Showcase Their Expertise: Highlight their specialized services, including event planning, logistics, 
      venue sourcing, and on-site management.
    - Expand Their Business: Gain access to new opportunities and grow their presence in the global events market.
    - Collaborate with Industry Professionals: Connect with other industry professionals, such as venue managers, 
      caterers, and entertainment providers, to build strong partnerships.
  `,
  },
  {
    title: "Oil & Gas and Renewable Energy",
    content: `
    The Energy sector supply chains matter now more than ever: 
    Energy companies have broadened their logistics supplier base, searching for lower prices, while others have taken the opposite approach, to be more sustainable: increasing the scope of the logistics services they outsource and partnering with service providers.

    These forward-looking companies are seeking ways to consolidate their many separate supply chains, co-locating materials in central storage hubs.

    ILN invites on their global platform, experienced and professionally managed energy sector handlers.
  `,
  },
];

const privileges = [
  {
    title: "Immediate Access to a Global Network",
    desc: "Connect with professional partners within the exclusive ILN Community.",
    icon: <HiOutlineGlobeAlt />,
  },
  {
    title: "Strategic Global Partnerships",
    desc: "Leverage our extensive network of global partners to expand your reach and explore new markets.",
    icon: <HiOutlineUserGroup />,
  },
  {
    title: "Exclusive Membership",
    desc: "Restricted membership per country with exceptions to China, India, and the Americas, ensuring a high-quality and exclusive network.",
    icon: <HiOutlineUsers />,
  },
  {
    title: "Protected Member Access",
    desc: "Secure access to the Members Lounge, a dedicated platform for exclusive member interactions.",
    icon: <HiOutlineLockClosed />,
  },
  {
    title: "Enhanced Visibility",
    desc: "Create a compelling member profile page to showcase your strengths and attract potential partners.",
    icon: <HiOutlineIdentification />,
  },
  {
    title: "Member Development Opportunities",
    desc: "Access exclusive resources, industry insights, and networking events to enhance your professional growth.",
    icon: <HiOutlineClipboardList />,
  },
  {
    title: "Annual General Meetings (AGMs)",
    desc: "Participate in our prestigious AGMs for valuable networking, business development, and social interaction.",
    icon: <HiOutlineCalendar />,
  },
  {
    title: "ILN Scheduler",
    desc: "Optimize your time at AGMs with the ILN Scheduler, a tool that facilitates efficient meeting scheduling with other members.",
    icon: <HiOutlineClock />,
  },
  {
    title: "Payment Protection Plan",
    desc: "Enhance financial security with our unique Payment Protection Plan, designed to mitigate risks associated with non-payment of invoices between member partners. (Conditions Apply)",
    icon: <HiOutlineShieldCheck />,
  },
  {
    title: "Comprehensive Insurance & Risk Management",
    desc: "Access competitively priced insurance solutions, including Marine Liability, General Liability, Warehouse/Property Coverage, and more, through our partnerships with leading risk management companies.",
    icon: <HiOutlineChartBar />,
  },
  {
    title: "Industry Insights",
    desc: "Insights: Stay informed with the latest industry news, updates, and market trends through our dedicated newsfeed and regular newsletters.",
    icon: <HiOutlineNewspaper />,
  },
];

/* ────────────  component  ──────────── */
const MembershipVerticals = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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

  const sliderSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
  };
  return (
    <div className="bg-white dark:bg-[var(--secondary-color)] text-[var(--secondary-color)] dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="relative h-full w-full overflow-hidden">
        <img src={bannerImg} alt="About Hero" className="w-full h-full " />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-light text-white drop-shadow-lg">
            Membership
          </h1>
        </div>
      </div>

      <section className="w-11/12 md:w-5/6 mx-auto py-12">
        {/* ✅ Mobile View: Accordion */}
        <div className="md:hidden">
          <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-4 dark:text-white">
            Membership Verticals
          </h2>
          <div className="space-y-4">
            {verticals.map((item, index) => {
              const isOpen = selectedIndex === index;
              return (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedIndex(isOpen ? -1 : index)}
                    className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center transition ${
                      isOpen
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                    }`}
                  >
                    {item.title}
                    <span className="text-xl">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 space-y-2">
                      {item.content
                        .split("\n")
                        .filter((para) => para.trim() !== "")
                        .map((para, i) => {
                          const trimmed = para.trim();
                          if (trimmed.startsWith("-")) {
                            return (
                              <ul
                                key={i}
                                className="list-disc list-inside pl-4"
                              >
                                <li className="mb-2">
                                  {trimmed.replace(/^-\s*/, "")}
                                </li>
                              </ul>
                            );
                          } else if (trimmed.endsWith(":")) {
                            return (
                              <p key={i} className="font-semibold text-lg">
                                {trimmed}
                              </p>
                            );
                          } else {
                            return <p key={i}>{trimmed}</p>;
                          }
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ Desktop View: Two-Column Layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_2fr] gap-10">
          {/* Left - Cards */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[var(--primary-color)] mb-4 dark:text-white">
              Membership Verticals
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {verticals.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`cursor-pointer rounded-xl border-2 px-4 py-1 text-center transition-all duration-300 shadow hover:shadow-lg ${
                    selectedIndex === index
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)] text-white font-semibold"
                      : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white"
                  }`}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            {selectedIndex >= 0 && verticals[selectedIndex] && (
              <>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                  {verticals[selectedIndex].title}
                </h3>
                {verticals[selectedIndex].content
                  .split("\n")
                  .filter((para) => para.trim() !== "")
                  .map((para, i) => {
                    const trimmed = para.trim();

                    if (trimmed.startsWith("-")) {
                      return (
                        <ul
                          key={i}
                          className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-4"
                        >
                          <li className="mb-2">
                            {trimmed.replace(/^-\s*/, "")}
                          </li>
                        </ul>
                      );
                    } else if (trimmed.endsWith(":")) {
                      return (
                        <p
                          key={i}
                          className="font-semibold text-lg text-gray-800 dark:text-white"
                        >
                          {trimmed}
                        </p>
                      );
                    } else {
                      return (
                        <p
                          key={i}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        >
                          {trimmed}
                        </p>
                      );
                    }
                  })}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative border-[var(--primary-color)]"
          >
            <div className="mb-5">
              <h4 className="text-3xl font-bold mb-6 text-[var(--primary-color)]">
                Scheduled Networking Opportunities & AGMs
              </h4>
              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                The ILN Annual General Meeting is a cornerstone of our
                community, offering unparalleled opportunities for networking,
                business development, and social interaction.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    title: "Formal Business Meetings",
                    description:
                      "Engage in formal business discussions, explore potential partnerships, and identify new opportunities.",
                  },
                  {
                    title: "Informal Networking",
                    description:
                      "Enjoy relaxed social settings to connect with fellow members, build relationships, and foster a strong sense of community.",
                  },
                  {
                    title: "Social Events",
                    description:
                      "Participate in ice-breaker activities, evening receptions, and dinners to enhance social connections and build lasting relationships.",
                  },
                  {
                    title: "Sponsorship Opportunities",
                    description:
                      "Sponsor the ILN AGM and gain valuable exposure to a network of influential industry leaders. Showcase your company’s expertise and build lasting relationships while supporting a thriving community.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <HiOutlineArrowCircleRight className="mt-1 text-[var(--primary-color)] text-xl flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--primary-color)]">
                        {item.title}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {!user && (
            <div data-aos="zoom-in" data-aos-delay="1000">
              <button
                onClick={() => setShowForm(true)}
                className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-tl-2xl rounded-br-2xl font-semibold transition hover:opacity-90"
              >
                Join the ILN Community
              </button>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="w-11/12 md:w-5/6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative border-[var(--primary-color)]"
          >
            <div className="mb-10">
              <h4 className="text-3xl font-bold mb-6 text-[var(--primary-color)]">
                The ILN Scheduler
              </h4>
              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                Prior to each AGM, members can utilize the ILN Scheduler to
                efficiently schedule meetings with other members they wish to
                connect with.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Personalized Scheduling",
                    description:
                      "The Scheduler analyzes member preferences and creates a customized schedule, optimizing meeting times and maximizing networking efficiency.",
                  },
                  {
                    title: "Streamlined Meetings",
                    description:
                      "Easily schedule one-on-one meetings and appointments, ensuring you make the most of your time at the AGM.",
                  },
                  {
                    title: "Enhanced Productivity",
                    description:
                      "Identify potential partners, finalize business deals, and explore new opportunities through efficient and targeted networking.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <HiOutlineArrowCircleRight className="mt-1 text-[var(--primary-color)] text-xl flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--primary-color)]">
                        {item.title}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <section className="w-11/12 md:w-5/6 mx-auto py-12">
        <h2 className="text-3xl font-bold text-center text-[var(--primary-color)] mb-12">
          Conference Sponsorships
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="bg-[#f5faff] border-l-4 border-blue-400 rounded-2xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              PLATINUM SPONSOR
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              ILN Member / External Sponsor (Airlines, Shipping Lines,
              Charterers, Industry Consultants)
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
              <li>Suite or a Meeting Pod Package</li>
              <li>1 Free ILN AGM Conference Pass</li>
              <li>Full graphics design and printing for booth panels</li>
              <li>One Suite/Pod structure measuring 3.0m x 2.0m x 1.5m</li>
              <li>Complimentary booth setup and removal</li>
              <li>Suite/Pod space</li>
              <li>Table counter with 1 chair</li>
              <li>Meeting table with 3 chairs</li>
              <li>Fascia with company name and booth number (Text Only)</li>
              <li>Booth carpeting</li>
              <li>Booth lighting</li>
              <li>1 power socket</li>
              <li>1 waste bin</li>
            </ul>
          </div>

         
          <div className="bg-[#fffaf3] border-l-4 border-yellow-400 rounded-2xl shadow p-6">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              GOLD SPONSOR
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              ILN Member / External Sponsor (Airlines, Shipping Lines,
              Charterers, Industry Consultants)
            </p>
            <ul className="list-disc list-inside text-gray-800 space-y-2 text-sm">
              <li>Suite or a Meeting Pod Package</li>
              <li>1 Free ILN AGM Conference Pass</li>
              <li>Full graphics design and printing for booth panels</li>
              <li>One Suite/Pod structure measuring 2.0m x 1.0m x 1.5m</li>
              <li>Complimentary booth setup and removal</li>
              <li>Suite/Pod space</li>
              <li>Table counter with 1 chair</li>
              <li>Fascia with company name and booth number (Text Only)</li>
              <li>Booth carpeting</li>
              <li>Booth lighting</li>
              <li>1 power socket</li>
              <li>1 waste bin</li>
            </ul>
          </div>
        </div>
      </section> */}

      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-[var(--primary-color)] ">
            Membership Privileges
          </h2>
          <p className="text-lg text-center mb-12 text-gray-600 dark:text-gray-300">
            Join the ILN network and create a safety net for your logistical
            needs.
          </p>

          <div className=" grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 hidden md:grid">
            {privileges.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-4 text-[var(--primary-color)] dark:text-[var(--primary-color-dark)]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="block lg:hidden">
            <Slider {...sliderSettings}>
              {privileges.map((item, i) => (
                <div key={i}>
                  <div className="bg-white dark:bg-neutral-800 border-l-4 border-[var(--primary-color)] p-6 rounded-xl shadow mx-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl text-[var(--primary-color)]">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-[var(--primary-color)]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className=" dark:bg-[var(--secondary-color)] text-gray-800 dark:text-white py-12 px-4 overflow-hidden">
        <div className="w-11/12 md:w-5/6 mx-auto space-y-16">
          {/* AGM Timeline-like List */}

          {/* ILN Financial Protection with visual flare */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative px-6 md:px-16 py-12 bg-gradient-to-tr from-[var(--primary-color)] to-[var(--primary-color)] text-white rounded-3xl shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/noise.png')] bg-cover bg-center" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                ILN Financial Protection
              </h3>
              <p className="text-base leading-relaxed whitespace-pre-line">
                New members undergo a thorough Financial Due Diligence process.
                Subsequently, they are protected by our comprehensive ILN
                Financial Protection Plan, designed to safeguard their financial
                interests in transactions conducted within the network. This
                unique offering provides security against potential financial
                losses due to non-payment of invoices between member partners.
                (Conditions Apply)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="w-11/12 md:w-5/6 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative border-[var(--primary-color)]"
          >
            <div className="mb-5">
              <h4 className="text-3xl font-bold mb-6 text-[var(--primary-color)]">
                ILN Insurance & Risk Management
              </h4>
              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                ILN, in collaboration with global risk management experts, is
                exploring special insurance packages with providers to offer
                risk management assistance to members, without directly
                offering insurance.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    title: "Comprehensive Coverage",
                    description:
                      "Access competitively priced insurance options, including Marine Liability, General Liability, Warehouse/Property Coverage, Transportation Coverage, and more.",
                  },
                  {
                    title: "Tailored Solutions",
                    description:
                      "Find insurance solutions that meet your specific business needs and mitigate potential risks.",
                  },
                  {
                    title: "Enhanced Security",
                    description:
                      "Protect your business from unforeseen events and ensure business continuity.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <HiOutlineArrowCircleRight className="mt-1 text-[var(--primary-color)] text-xl flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--primary-color)]">
                        {item.title}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          {!user && (
            <div data-aos="zoom-in" data-aos-delay="1000">
              <button
                onClick={() => setShowForm(true)}
                className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-tl-2xl rounded-br-2xl font-semibold transition hover:opacity-90"
              >
                Join the ILN Community
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-[var(--secondary-color)] text-gray-800 dark:text-white">
        <div className="w-11/12 md:w-5/6 mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Member Lounge */}
            <div>
              <h2 className="text-3xl font-bold text-center md:text-left text-[var(--primary-color)] mb-4">
                Member Lounge
              </h2>
              <p className="text-center md:text-left text-gray-600 dark:text-gray-300 mb-8">
                The exclusive Members Lounge is a valuable marketing and
                networking tool.
              </p>

              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Enhanced Visibility
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Create a unique and engaging member profile page to showcase
                    your company's strengths, services, and differentiators.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Increased Visibility
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Gain greater visibility within the ILN network and attract
                    potential partners.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Build Trust and Credibility
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    The ILN Rating displayed on your profile page enhances your
                    credibility and builds trust among other members.
                  </p>
                </li>
              </ul>
            </div>

            {/* Newsfeed */}
            <div>
              <h2 className="text-3xl  font-bold text-center md:text-left text-[var(--primary-color)] dark:text-[var(--primary-color-dark)] mb-4">
                Newsfeed
              </h2>
              <p className="text-center md:text-left text-gray-600 dark:text-gray-300 mb-8">
                Stay informed with the latest industry news, trends, and updates
                through our dedicated newsfeed.
              </p>

              <ul className="space-y-4">
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Valuable Insights
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Access timely and relevant information to make informed
                    business decisions.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Competitive Advantage
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Gain a competitive edge by staying ahead of the curve on
                    industry developments.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-lg mb-1">
                    Enhanced Knowledge
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Expand your knowledge base and improve your understanding of
                    the global logistics landscape.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <JoinFormPopup isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default MembershipVerticals;
