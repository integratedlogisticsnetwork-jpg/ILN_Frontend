import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero from "../assets/Company Directory Banner.png";
import axios from "axios";
import Select from "react-select";
import { Country, State } from "country-state-city";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Member {
  _id: string;
  companyName: string;
  contactName: string;
  businessVerticals: string;
  country: string;
  state: string;
  logoUrl: string;
  memberId: string;
}

const ITEMS_PER_PAGE = 12;

const Directory = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filtered, setFiltered] = useState<Member[]>([]);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const { email } = JSON.parse(userData);
    if (!email) return;

    axios.get(`${baseURL}/api/members/approvedMembers/${email}`).then((res) => {
      setMembers(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    let temp = [...members];

    if (selectedVerticals.length > 0) {
      temp = temp.filter((m) => {
        let verticals: string[] = [];

        try {
          verticals = JSON.parse(m.businessVerticals);
        } catch (err) {
          console.error("Invalid verticals JSON", m.businessVerticals);
        }

        return selectedVerticals.some((v) => verticals.includes(v));
      });
    }

    if (selectedCountry) {
      temp = temp.filter((m) => m.country === selectedCountry);
    }

    if (selectedState) {
      temp = temp.filter((m) => m.state === selectedState);
    }

    setFiltered(temp);
    setCurrentPage(1);
  }, [selectedVerticals, selectedCountry, selectedState, members]);

  const verticalOptions = [
    "Freight Forwarding & Customs Brokers",
    "Supply Chain",
    "Cold Chain – Pharma & Perishables",
    "E-commerce & Express Handlers",
    "Aerospace & AOG",
    "Fine Art & Antiques Logistics",
    "Professional Packers & Movers – Relocations",
    "Events & Exhibition Handlers",
    "Oil & Gas and Renewable Energy",
  ].map((v) => ({ label: v, value: v }));

  const countryList = Country.getAllCountries();
  const selectedCountryIso =
    countryList.find((c) => c.name === selectedCountry)?.isoCode || "";
  const stateList = selectedCountry
    ? State.getStatesOfCountry(selectedCountryIso)
    : [];

  const paginatedMembers = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white dark:bg-[var(--secondary-color)] text-black dark:text-white min-h-screen transition-colors">
      <Navbar />

      <div className="relative object-contain w-full overflow-hidden">
        <img src={hero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-light text-white drop-shadow-lg">
            Company Directory
          </h1>
        </div>
      </div>

      <div className="w-11/12 md:w-5/6 mx-auto px-4 py-10">
        {/* filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block mb-1 font-semibold">
              Business Verticals
            </label>
            <Select
              isMulti
              placeholder="Select Verticals"
              options={verticalOptions}
              onChange={(selected) =>
                setSelectedVerticals(selected.map((s) => s.value))
              }
              className="text-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Country</label>
            <select
              className="w-full p-2 rounded border text-gray-700"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState("");
              }}
            >
              <option value="">All Countries</option>
              {countryList.map((c) => (
                <option key={c.isoCode} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">State</label>
            <select
              className="w-full p-2 rounded border text-gray-700"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="">All States</option>
              {stateList.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop view */}

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedMembers.length === 0 && (
            <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
              No members found.
            </p>
          )}

          {paginatedMembers.map((member) => (
            <div
              key={member._id}
              className="flex flex-col border rounded-xl shadow-md bg-white dark:bg-[var(--bg-color1)] hover:shadow-lg transition overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 border-b dark:border-gray-700">
                {member.logoUrl ? (
                  <img
                    src={member.logoUrl}
                    alt={member.companyName}
                    className="h-16 w-16 object-contain bg-white p-1 rounded border"
                  />
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center bg-gray-100 text-xs text-gray-500 border rounded">
                    No Logo
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {member.companyName}
                  </h2>
                  <p>Member Id: {member.memberId}</p>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-full flex-1">
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Verticals:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {JSON.parse(member.businessVerticals).map(
                      (v: string, i: number) => (
                        <li key={i}>{v}</li>
                      )
                    )}
                  </ul>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Country:</strong> {member.country}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <strong>State:</strong> {member.state}
                </p>

                <button
                  onClick={() =>
                    (window.location.href = `/member/${member._id}`)
                  }
                  className="w-fit px-4 py-2 text-sm font-medium rounded-tl-xl rounded-br-xl bg-[var(--primary-color)] text-white hover:opacity-90 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {paginatedMembers.map((member) => (
            <div
              key={member._id}
              className="border rounded-xl shadow-md bg-white dark:bg-[var(--bg-color1)] hover:shadow-lg transition overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === member._id ? null : member._id)
                }
              >
                <div className="flex items-center gap-4">
                  {member.logoUrl ? (
                    <img
                      src={member.logoUrl}
                      alt={member.companyName}
                      className="h-12 w-12 object-contain bg-white p-1 rounded border"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-xs text-gray-500 border rounded">
                      No Logo
                    </div>
                  )}
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                      {member.companyName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Member ID: {member.memberId}
                    </p>
                  </div>
                </div>
                <div className="text-xl text-gray-500">
                  {expandedId === member._id ? "▲" : "▼"}
                </div>
              </div>

              {expandedId === member._id && (
                <div className="px-4 pb-4">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Verticals:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {JSON.parse(member.businessVerticals).map(
                        (v: string, i: number) => (
                          <li key={i}>{v}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Country:</strong> {member.country}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <strong>State:</strong> {member.state}
                  </p>

                  <button
                    onClick={() =>
                      (window.location.href = `/member/${member._id}`)
                    }
                    className="px-4 py-2 text-sm font-medium rounded-tl-xl rounded-br-xl bg-[var(--primary-color)] text-white hover:opacity-90 transition"
                  >
                    View Profile
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === i + 1
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Directory;
