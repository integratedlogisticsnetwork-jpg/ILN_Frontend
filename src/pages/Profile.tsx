import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  Building2,
  Phone,
  Mail,
  FileText,
  Layers,
  Globe,
  Building,
  User,
  Crown,
} from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";
import { Disclosure } from "@headlessui/react";
import defaultImage from "../assets/default user.png";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface KeyMember {
  _id?: string;
  name: string;
  image: string;
  phone: string;
  email: string;
  role: string;
  description: string;
  file?: File | null; // 👈 temp file object for editing
}

interface Member {
  logoUrl?: string;
  companyName: string;
  contactName: string;
  email: string;
  memberId: string;
  website?: string;
  establishmentDate?: string;
  telephone: string;
  building?: string;
  street?: string;
  area?: string;
  state: string;
  country: string;
  landmark?: string;
  poBox?: string;
  businessVerticals: string;
  companyProfile?: string;
  keyMembers?: KeyMember[]; // ← Add this
  designation?: string;
}

function Profile() {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoEdit, setShowLogoEdit] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [updatingLogo, setUpdatingLogo] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editData, setEditData] = useState<Partial<Member>>({});
  const [updatingInfo, setUpdatingInfo] = useState(false);
  const [showEditVerticals, setShowEditVerticals] = useState(false);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [updatingVerticals, setUpdatingVerticals] = useState(false);
  const [showEditMembers, setShowEditMembers] = useState(false);
  const [keyMembersData, setKeyMembersData] = useState<KeyMember[]>([]);
  const [memberImages, setMemberImages] = useState<(File | null)[]>([]);
  const [updatingMembers, setUpdatingMembers] = useState(false);

  const ALL_VERTICALS = [
    "Freight Forwarding & Customs Brokers",
    "Supply Chain",
    "Cold Chain – Pharma & Perishables",
    "E-commerce & Express Handlers",
    "Aerospace & AOG",
    "Fine Art & Antiques Logistics",
    "Professional Packers & Movers – Relocations",
    "Events & Exhibition Handlers",
    "Oil & Gas and Renewable Energy",
  ];

  useEffect(() => {
    if (member?.businessVerticals) {
      try {
        const parsed = JSON.parse(member.businessVerticals);
        setSelectedVerticals(Array.isArray(parsed) ? parsed : []);
      } catch {
        setSelectedVerticals([]);
      }
    }

    if (member?.keyMembers) {
      setKeyMembersData(member.keyMembers);
      setMemberImages(member.keyMembers.map(() => null)); // placeholder
    }
  }, [member]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const { email } = JSON.parse(userData);
    if (!email) return;

    axios
      .get(`${baseURL}/api/members/profile/${email}`)
      .then((res) => setMember(res.data))

      .catch((err) => console.error("Failed to fetch member:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[var(--secondary-color)] text-black dark:text-white">
      <Navbar />

      <div className="w-11/12 md:w-4/5 mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          Company Profile
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : member ? (
          <div className=" rounded-lg shadow-lg dark:shadow-gray-600 p-6 space-y-10">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Logo */}
              <div className="relative w-48 h-48 p-2 rounded-lg border bg-white overflow-hidden shadow-sm flex items-center justify-center">
                {member.logoUrl ? (
                  <img
                    src={member.logoUrl}
                    alt="Company Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Logo</span>
                )}

                {/* Edit Button */}
                <button
                  className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-1 rounded border"
                  onClick={() => setShowLogoEdit(true)}
                >
                  ✏️
                </button>
              </div>

              {/* Company Info */}
              <div className="flex-1 text-base space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Building2 size={20} /> {member.companyName}
                  </h2>
                  <button
                    className="text-sm px-3 py-1  rounded hover:bg-gray-100 dark:hover:bg-white/10"
                    onClick={() => {
                      if (member) {
                        setEditData({
                          companyName: member.companyName,
                          email: member.email,
                          telephone: member.telephone,
                          website: member.website,
                          establishmentDate: member.establishmentDate,
                        });
                        setShowEditInfo(true);
                      }
                    }}
                  >
                    ✏️
                  </button>
                </div>
                <p className="flex items-center gap-2">
                  <User size={18} className="text-purple-600" />
                  <span>Member Id: {member.memberId}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-red-500" />
                  <span>{member.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-green-600" />
                  <span>{member.telephone}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Globe size={18} className="text-blue-500" />
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    {member.website}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Building size={18} className="text-black" />
                  <span>
                    {member.establishmentDate
                      ? new Date(member.establishmentDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <FaLocationDot size={18} className="text-purple-500 mt-1" />
                  <span>
                    {[member.building, member.street, member.area]
                      .filter(Boolean)
                      .join(", ")}
                    {member.poBox && `, P.O. Box: ${member.poBox}`} <br />
                    {member.state}, {member.country}
                  </span>
                </p>
              </div>
            </div>
            {/* Company Profile */}
            {member.companyProfile && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileText size={20} /> Company Profile
                  </h3>
                  <button
                    onClick={() => {
                      setEditData({ companyProfile: member.companyProfile });
                      setShowEditProfile(true);
                    }}
                    className="text-sm text-blue-500 "
                  >
                    ✏️
                  </button>
                </div>

                <p className="leading-relaxed text-gray-800 dark:text-gray-200   p-4 rounded-lg border dark:border-white/10">
                  {member.companyProfile}
                </p>
              </div>
            )}
            {/* Business Verticals */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Layers size={20} /> Specialized Verticals
                </h3>
                <button
                  className="text-sm text-blue-600 "
                  onClick={() => setShowEditVerticals(true)}
                >
                  ✏️
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(() => {
                  try {
                    return JSON.parse(member?.businessVerticals || "[]").map(
                      (v: string, i: number) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-300 text-sm px-3 py-1 rounded-full"
                        >
                          {v}
                        </span>
                      )
                    );
                  } catch {
                    return (
                      <span className="text-red-500 text-base">
                        Invalid verticals format
                      </span>
                    );
                  }
                })()}
              </div>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Key Members
                <div className="flex gap-2">
                  <button
                    className="text-sm text-blue-600"
                    onClick={() => setShowEditMembers(true)}
                  >
                    ✏️
                  </button>
                </div>
              </h3>

              {!member.keyMembers || member.keyMembers.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No members added yet.
                </p>
              ) : (
                <>
                  {/* Mobile view - collapsible */}
                  <div className="md:hidden space-y-4">
                    {member.keyMembers.map((km, index) => (
                      <Disclosure key={index}>
                        {({ open }: { open: boolean }) => (
                          <div className="border dark:border-white/10 rounded-lg overflow-hidden">
                            <Disclosure.Button className="w-full text-left px-4 py-3 bg-white dark:bg-[var(--bg-color1)] font-medium flex justify-between items-center">
                              <span>{km.name}</span>
                              <span>{open ? "▲" : "▼"}</span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pb-4 pt-2 text-sm bg-white dark:bg-[var(--bg-color1)]">
                              <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border">
                                  {km.image ? (
                                    <img
                                      src={km.image}
                                      alt={km.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm text-gray-400">
                                      No Image
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                  {km.role}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {km.email}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {km.phone}
                                </p>
                              </div>
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    ))}
                  </div>

                  {/* Desktop view - grid */}
                  <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {member.keyMembers.map((km, index) => (
                      <div
                        key={index}
                        className="relative bg-white dark:bg-[var(--bg-color1)] border dark:border-white/10 rounded-xl shadow p-4 flex flex-col items-center text-center"
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
                            onError={(e) =>
                              (e.currentTarget.src = defaultImage)
                            }
                          />
                        </div>

                        <h4 className="text-lg font-semibold">{km.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {km.role}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {km.email}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {km.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <p>No profile data found.</p>
        )}
      </div>

      <Footer />

      {showLogoEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white  text-black  rounded-lg p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-semibold mb-4">Update Logo</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setLogoFile(e.target.files[0]);
                }
              }}
              className="mb-4 w-full border p-2 rounded"
            />

            <div className="flex justify-between">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => {
                  setShowLogoEdit(false);
                  setLogoFile(null);
                }}
              >
                Cancel
              </button>

              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                disabled={updatingLogo}
                onClick={async () => {
                  if (!logoFile || !member) return;

                  const formData = new FormData();
                  formData.append("logo", logoFile);

                  try {
                    setUpdatingLogo(true);
                    const res = await axios.put(
                      `${baseURL}/api/members/profile/${member.email}`,
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );

                    setMember((prev) => ({
                      ...prev!,
                      logoUrl: res.data.logoUrl,
                    }));
                    // ✅ Update localStorage 'user'
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                      const parsed = JSON.parse(storedUser);
                      parsed.logo = res.data.logoUrl;
                      localStorage.setItem("user", JSON.stringify(parsed));
                    }

                    window.location.reload();

                    setShowLogoEdit(false);
                    setLogoFile(null);
                  } catch (err) {
                    console.error("Logo upload failed", err);
                  } finally {
                    setUpdatingLogo(false);
                  }
                }}
              >
                {updatingLogo ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditInfo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white  p-6 rounded-lg w-full max-w-xl text-black ">
            <h2 className="text-lg font-semibold mb-4">Edit Company Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={editData.companyName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, companyName: e.target.value })
                }
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <input
                type="email"
                value={editData.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={editData.telephone || ""}
                onChange={(e) =>
                  setEditData({ ...editData, telephone: e.target.value })
                }
                placeholder="Telephone"
                className="border p-2 rounded"
              />
              <input
                type="url"
                value={editData.website || ""}
                onChange={(e) =>
                  setEditData({ ...editData, website: e.target.value })
                }
                placeholder="Website"
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={editData.establishmentDate?.substring(0, 10) || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    establishmentDate: e.target.value,
                  })
                }
                className="border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-1 border rounded"
                onClick={() => setShowEditInfo(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                disabled={updatingInfo}
                onClick={async () => {
                  if (!member) return;

                  try {
                    setUpdatingInfo(true);
                    const res = await axios.put(
                      `${baseURL}/api/members/profile/${member.email}`,
                      editData
                    );
                    setMember(res.data);

                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                      const parsed = JSON.parse(storedUser);
                      parsed.companyName = res.data.companyName;
                      parsed.email = res.data.email;
                      localStorage.setItem("user", JSON.stringify(parsed));
                    }

                    setShowEditInfo(false);
                  } catch (err) {
                    console.error("Failed to update company info", err);
                  } finally {
                    setUpdatingInfo(false);
                  }
                }}
              >
                {updatingInfo ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Company Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl text-black ">
            <h2 className="text-lg font-semibold mb-4">Edit Company Profile</h2>
            <textarea
              rows={6}
              value={editData.companyProfile || ""}
              onChange={(e) =>
                setEditData({ ...editData, companyProfile: e.target.value })
              }
              className="w-full border rounded p-2"
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-1 border rounded"
                onClick={() => setShowEditProfile(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                disabled={updatingInfo}
                onClick={async () => {
                  if (!member) return;
                  try {
                    setUpdatingInfo(true);
                    const res = await axios.put(
                      `${baseURL}/api/members/profile/${member.email}`,
                      { companyProfile: editData.companyProfile }
                    );
                    setMember(res.data);
                    setShowEditProfile(false);
                  } catch (err) {
                    console.error("Failed to update company profile", err);
                  } finally {
                    setUpdatingInfo(false);
                  }
                }}
              >
                {updatingInfo ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditVerticals && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white  p-6 rounded-lg w-full max-w-2xl text-black ">
            <h2 className="text-lg font-semibold mb-4">
              Edit Business Verticals
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {ALL_VERTICALS.map((vertical) => (
                <button
                  key={vertical}
                  onClick={() =>
                    setSelectedVerticals((prev) =>
                      prev.includes(vertical)
                        ? prev.filter((v) => v !== vertical)
                        : [...prev, vertical]
                    )
                  }
                  className={`px-3 py-1 rounded-full border ${
                    selectedVerticals.includes(vertical)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {vertical}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-1 border rounded"
                onClick={() => setShowEditVerticals(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                disabled={updatingVerticals}
                onClick={async () => {
                  if (!member) return;

                  try {
                    setUpdatingVerticals(true);
                    const res = await axios.put(
                      `${baseURL}/api/members/profile/${member.email}`,
                      {
                        businessVerticals: JSON.stringify(selectedVerticals),
                      }
                    );
                    setMember(res.data);
                    setShowEditVerticals(false);
                  } catch (err) {
                    console.error("Failed to update verticals", err);
                  } finally {
                    setUpdatingVerticals(false);
                  }
                }}
              >
                {updatingVerticals ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditMembers && (
        <div className="fixed inset-0 bg-black/40 z-50 px-4 py-10 overflow-y-auto flex justify-center items-start">
          <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Key Members</h2>

            <div className="space-y-6">
              {keyMembersData.map((km, index) => (
                <div
                  key={km._id || index}
                  className="border rounded-lg p-4 space-y-2 bg-gray-50 dark:bg-white/5"
                >
                  {/* Name & Role */}
                  <div className="flex flex-col md:flex-row  gap-4">
                    <input
                      type="text"
                      value={km.name}
                      onChange={(e) => {
                        const updated = [...keyMembersData];
                        updated[index].name = e.target.value;
                        setKeyMembersData(updated);
                      }}
                      placeholder="Name"
                      className="flex-1 border p-2 rounded"
                    />
                    <input
                      type="text"
                      value={km.role}
                      onChange={(e) => {
                        const updated = [...keyMembersData];
                        updated[index].role = e.target.value;
                        setKeyMembersData(updated);
                      }}
                      placeholder="Role"
                      className="flex-1 border p-2 rounded"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="email"
                      value={km.email}
                      onChange={(e) => {
                        const updated = [...keyMembersData];
                        updated[index].email = e.target.value;
                        setKeyMembersData(updated);
                      }}
                      placeholder="Email"
                      className="flex-1 border p-2 rounded"
                    />
                    <input
                      type="text"
                      value={km.phone}
                      onChange={(e) => {
                        const updated = [...keyMembersData];
                        updated[index].phone = e.target.value;
                        setKeyMembersData(updated);
                      }}
                      placeholder="Phone"
                      className="flex-1 border p-2 rounded"
                    />
                  </div>

                  {/* Description */}
                  <textarea
                    value={km.description}
                    onChange={(e) => {
                      const updated = [...keyMembersData];
                      updated[index].description = e.target.value;
                      setKeyMembersData(updated);
                    }}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    rows={3}
                  />

                  {/* Image Upload */}
                  <div className="flex flex-col md:flex-row md:justify-between  gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        const updatedFiles = [...memberImages];
                        updatedFiles[index] = file;
                        setMemberImages(updatedFiles);

                        // For preview
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const updated = [...keyMembersData];
                            updated[index].image = reader.result as string;
                            setKeyMembersData(updated);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    {km.image && (
                      <img
                        src={km.image}
                        alt={km.name}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    )}
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => {
                        const updatedData = keyMembersData.filter(
                          (_, i) => i !== index
                        );
                        const updatedImages = memberImages.filter(
                          (_, i) => i !== index
                        );
                        setKeyMembersData(updatedData);
                        setMemberImages(updatedImages);
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add new member */}
            {keyMembersData.length < 6 && (
              <button
                className="mt-4 text-sm text-green-600 underline"
                onClick={() => {
                  const tempId = `temp-${Date.now()}`;
                  setKeyMembersData([
                    ...keyMembersData,
                    {
                      _id: tempId,
                      name: "",
                      email: "",
                      phone: "",
                      role: "",
                      description: "",
                      image: "",
                    },
                  ]);
                  setMemberImages([...memberImages, null]);
                }}
              >
                ➕ Add Member
              </button>
            )}

            {/* Save */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-1 border rounded"
                onClick={() => setShowEditMembers(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                disabled={updatingMembers}
                onClick={async () => {
                  if (!member) return;
                  try {
                    setUpdatingMembers(true);
                    const formData = new FormData();

                    // Send keyMembers as JSON string
                    formData.append(
                      "keyMembers",
                      JSON.stringify(keyMembersData)
                    );

                    // Attach each image with member _id or temp-id as filename
                    keyMembersData.forEach((km, idx) => {
                      const file = memberImages[idx];
                      if (file) {
                        const identifier = km._id || `temp-${idx}`;
                        formData.append("memberImages", file, identifier); // <--- very important
                      }
                    });

                    const res = await axios.put(
                      `${baseURL}/api/members/profile/${member.email}`,
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );

                    setMember(res.data);
                    setShowEditMembers(false);
                  } catch (err) {
                    console.error("Failed to update key members", err);
                  } finally {
                    setUpdatingMembers(false);
                  }
                }}
              >
                {updatingMembers ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
