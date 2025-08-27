export default function ILNBenefits() {
  const benefits = [
    {
      title: "Forge Strategic Alliances",
      description:
        "Connect with a global network of professionals, expanding your reach and identifying trusted partners across the entire supply chain.",
    },
    {
      title: "Enhance Your Industry Profile",
      description:
        "Elevate your professional standing by attending exclusive ILN Annual General Meetings and networking conferences.",
    },
    {
      title: "Deliver Bespoke Solutions",
      description:
        "Find the ideal service partners and co-create customized solutions that align with your unique business needs and exceed client expectations.",
    },
    {
      title: "Thrive in a Supportive Community",
      description:
        "Experience a strong sense of belonging within a thriving network of industry professionals.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-[var(--secondary-color)] text-[var(--secondary-color)] dark:text-white py-16">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <div className="text-center mb-10">
          {/* <p className="text-sm uppercase text-[var(--primary-color)]">
            Benefits
          </p> */}
          <h2 className="text-4xl font-bold mt-2">
            Experience Unparalleled Growth
          </h2>
          <p className="text-gray-600 dark:text-white/70 mt-2">
            Within the secure and reliable ILN ecosystem, you gain:
          </p>
        </div>

        {/* Grid layout for benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[var(--bg-color1)] rounded-xl shadow-md hover:shadow-xl dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all p-6 text-center flex flex-col items-center "
            >
              <h3 className="text-lg font-semibold mb-2 text-[var(--primary-color)]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
