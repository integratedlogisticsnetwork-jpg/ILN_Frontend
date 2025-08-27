import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import defaultImage from "../assets/default user.png";
import { Crown } from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface KeyMember {
  _id: string;
  name: string;
  image: string;
  phone: string;
  email: string;
  role: string;
  description: string;
}

interface Member {
  _id: string;
  companyName: string;
  legalStructure: string;
  establishmentDate: string;
  building: string;
  memberId: string;
  street: string;
  area: string;
  landmark: string;
  poBox: string;
  state: string;
  country: string;
  telephone: string;
  email: string;
  website?: string;
  businessVerticals: string;
  companyProfile: string;
  contactName: string;
  designation: string;
  logoUrl: string;
  keyMembers?: KeyMember[];
}

const DirectoryDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<KeyMember | null>(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/members/${id}`).then((res) => {
      setMember(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!member) return <div className="p-10 text-center">Member not found</div>;

  return (
    <div className="bg-white dark:bg-[var(--secondary-color)] text-black dark:text-white min-h-screen">
      <Navbar />

      <div className="w-11/12 md:w-5/6 mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
          {/* Logo */}
          <div className="w-full flex justify-center">
            <div className="w-64 h-64 bg-white dark:bg-gray-700 border rounded-xl flex items-center justify-center overflow-hidden">
              {member.logoUrl ? (
                <img
                  src={member.logoUrl}
                  alt={member.companyName}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <span className="text-sm text-gray-400">No Logo</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-3 text-sm">
            <h1 className="text-3xl font-bold">{member.companyName}</h1>
            <p>
              <strong>Member Id:</strong> {member.memberId}
            </p>

            <div>
              <strong>Address:</strong>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                {[member.building, member.street, member.area]
                  .filter(Boolean)
                  .join(", ")}
                <br />
                {member.state}, {member.country}
                {member.poBox && `, PO Box: ${member.poBox}`}
              </p>
            </div>

            <p>
              <strong>Phone:</strong> {member.telephone}
            </p>
            <p>
              <strong>Email:</strong> {member.email}
            </p>

            {member.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {member.website}
                </a>
              </p>
            )}

            <p>
              <strong>Established:</strong>{" "}
              {new Date(member.establishmentDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-10">
            {/* Verticals */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Specialized Verticals
              </h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {JSON.parse(member.businessVerticals).map(
                  (v: string, i: number) => (
                    <span
                      key={i}
                      className="bg-blue-100 dark:bg-[var(--bg-color1)] text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
                    >
                      {v}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Profile */}
            {member.companyProfile && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">Company Profile</h2>
                <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {member.companyProfile}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          {member.keyMembers && member.keyMembers.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Members</h2>
              <div className="grid grid-cols-1 gap-4">
                {member.keyMembers.map((km, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedMember(km)}
                    className="relative bg-white dark:bg-[var(--bg-color1)] rounded-xl shadow p-4 flex items-center cursor-pointer gap-4"
                  >
                    {/* Flag for primary member */}
                    {index === 0 && (
                      <div
                        className="absolute top-2 right-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm flex items-center gap-1"
                        title="Primary Member"
                      >
                        <Crown className="w-6 h-6" />
                      </div>
                    )}

                    {/* Image on the left */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border shrink-0">
                      <img
                        src={km.image || defaultImage}
                        alt={km.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = defaultImage)}
                      />
                    </div>

                    {/* Info on the right */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{km.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                        {km.role}
                      </p>
                      {km.email && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          📧 {km.email}
                        </p>
                      )}

                      {km.phone && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          📞 {km.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border shrink-0">
                <img
                  src={selectedMember.image || defaultImage}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = defaultImage)}
                />
              </div>
              <h3 className="text-xl font-semibold flex items-center gap-1">
                {selectedMember.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {selectedMember.role}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📧 {selectedMember.email}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📞 {selectedMember.phone}
              </p>
              <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {selectedMember.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DirectoryDetails;
