import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
import logo from "../assets/ILN Logo v2.png";
import { exportToExcel } from "../utils/exportToExcel";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Edit, Trash } from "lucide-react";
import AddBlog from "../components/AddBlogs"; // adjust path if needed
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import AddOffer from "../components/AddOffer";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useNavigate } from "react-router-dom";

// import YourOfferModalComponent from "../components/AddOffer"; // adjust path if needed

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);
  const [activePanel, setActivePanel] = useState("Email Subscribers");
  const [emailerData, setEmailerData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [subscriberFilterDate, setSubscriberFilterDate] = useState("");
  const [emailerFilterDate, setEmailerFilterDate] = useState("");
  const [newsfeed, setNewsfeed] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showNewsfeedModal, setShowNewsfeedModal] = useState(false);
  const [newNews, setNewNews] = useState({ title: "", link: "", date: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "approve" | "reject" | null
  >(null);

  const [agms, setAgms] = useState<AgmType[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [showAgmModal, setShowAgmModal] = useState(false);
  const [editingAgm, setEditingAgm] = useState<AgmType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [_loading, setLoading] = useState(false);

  const postsPerPage = 20;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const navigate = useNavigate();

  interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    author: string;
    datePublished: string;
    slug: string;
    content: string; // ✅ Add this line
  }

  interface Member {
    _id: string;
    companyName: string;
    logoUrl: string;
    legalStructure: string;
    establishmentDate: string;
    building: string;
    street: string;
    area: string;
    landmark?: string;
    poBox?: string;
    state?: string;
    country: string;
    telephone: string;
    email: string;
    businessVerticals: string[];
    companyProfile: string;
    contactName: string;
    designation: string;
    status: string;
  }

  interface Offer {
    _id: string;
    title: string;
    subtitle?: string;
    bannerImage?: string;
    ctaLabel?: string;
    ctaLink?: string;
    startDate?: string;
    endDate?: string;
  }

  type AgmType = {
    _id: string;
    title: string;
    subtitle: string;
    content?: string;
    image?: string;
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["link"],
  ];

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem("adminToken");
  //   };

  //   const handlePopState = () => {
  //     localStorage.removeItem("adminToken");
  //     navigate("/admin", { replace: true });
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    }
  }, []);

  //   const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (editingAgm) {
      setTitle(editingAgm.title || "");
      setSubtitle(editingAgm.subtitle || "");
      setContent(editingAgm.content || "");
      setExistingImageUrl(editingAgm.image || null); // Set image URL for preview
      setImageFile(null);
    } else {
      setTitle("");
      setSubtitle("");
      setContent("");
      setExistingImageUrl(null);
      setImageFile(null);
    }
  }, [editingAgm]);

  const fetchNewsfeed = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/newsfeed`);
      setNewsfeed(res.data);
    } catch (err) {
      console.error("Failed to fetch newsfeed");
    }
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/members`);
      const data = await res.json();
      // console.log(data);
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/contact`);
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoadingContacts(false);
    }
  };
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/offer/view`);
      setOffers(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchAgms = async () => {
    try {
      const res = await axios.get(`${baseURL}/agm`);
      setAgms(res.data);
    } catch (err) {
      console.error("Failed to fetch AGM");
    }
  };

  useEffect(() => {
    fetchNewsfeed();
    fetchContacts();
    fetchOffers();
    fetchAgms();
    fetchMembers();
  }, []);

  const handleDeleteNewsfeed = async (id: any) => {
    try {
      await axios.delete(`${baseURL}/api/newsfeed/${id}`);
      fetchNewsfeed();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAddNews = async () => {
    try {
      await axios.post(`${baseURL}/api/newsfeed`, newNews);
      setNewNews({ title: "", link: "", date: "" });
      setShowNewsfeedModal(false);
      fetchNewsfeed();
    } catch (err) {
      console.error("Failed to add news");
    }
  };

  const handleEditNews = async () => {
    if (!editingId) return;
    try {
      await axios.put(`${baseURL}/api/newsfeed/${editingId}`, newNews);
      setNewNews({ title: "", link: "", date: "" });
      setEditingId(null);
      setShowNewsfeedModal(false);
      fetchNewsfeed();
    } catch (err) {
      console.error("Failed to update newsfeed");
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/auth/allUser`)
      .then((res) => {
        // console.log("Users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Users error:", err));

    axios
      .get(`${baseURL}/newsletter`)
      .then((res) => {
        // console.log("Newsletter:", res.data);
        setNewsletterData(res.data);
      })
      .catch((err) => console.error("Newsletter error:", err));

    axios
      .get(`${baseURL}/subscribers`)
      .then((res) => {
        // console.log("Subscribers:", res.data);
        setEmailSubscribers(res.data);
      })
      .catch((err) => console.error("Subscribers error:", err));

    axios
      .get(`${baseURL}/api/popup-lead`)
      .then((res) => {
        // console.log("Leads:", res.data);
        setPopupLeads(res.data);
      })
      .catch((err) => console.error("Leads error:", err));

    // Fetch Emailer Data
    axios
      .get(`${baseURL}/emailer`)
      .then((res) => {
        // console.log("Emailer:", res.data);
        setEmailerData(res.data);
      })
      .catch((err) => console.error("Emailer error:", err));

    axios
      .get(`${baseURL}/api/blogs/viewblog`)
      .then((res) => {
        // console.log("Blogs:", res.data);
        setBlogs(res.data);
      })
      .catch((err) => console.error("Blogs error:", err));
  }, []);

  const menuItems = [
    // "Users",

    "Email Subscribers",
    // "Popup Leads",
    "Emailer Data",
    "Newsletter Data",
    "Blog Data",
    "Information Pop-up",
    "Newsfeed",
    "Contact Form",
    "Membership Requests",
    "AGM",
  ];

  const fetchBlogs = () => {
    axios
      .get(`${baseURL}/api/blogs/viewblog`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Blogs error:", err));
  };

  const handleEdit = (slug: string) => {
    const blogToEdit = blogs.find((b: any) => b.slug === slug);
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setShowAddModal(true);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete(`${baseURL}/api/blogs/${slug}`);
      alert(res.data.msg || "Deleted");
      fetchBlogs();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingBlog(null);
  };

  useEffect(() => {
    if (!filterDate) {
      setFilteredLeads(popupLeads);
      return;
    }

    const selectedDate = new Date(filterDate).toDateString();

    const filtered = popupLeads.filter((lead: any) => {
      const leadDate = new Date(lead.createdAt).toDateString();
      return leadDate === selectedDate;
    });

    setFilteredLeads(filtered);
  }, [filterDate, popupLeads]);

  const filteredSubscribers = subscriberFilterDate
    ? emailSubscribers.filter((sub: any) => {
        const subDate = new Date(sub.createdAt).toISOString().split("T")[0];
        return subDate === subscriberFilterDate;
      })
    : emailSubscribers;

  const filteredEmailerData = emailerFilterDate
    ? emailerData.filter(
        (item: any) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(emailerFilterDate).toLocaleDateString()
      )
    : emailerData;

  return (
    <div className="text-black dark:text-white relative">
      <nav className="sticky top-0 w-full z-50 shadow py-2 px-6 bg-white">
        <a href="/adminPage">
          <img src={logo} alt="ILN Logo" className="h-24" draggable="false" />
        </a>
      </nav>
      <div className="min-h-screen bg-white dark:bg-black py-6 ">
        <div className="flex flex-col md:flex-row gap-6">
          {/* SIDEBAR (Desktop Only) */}

          <aside className="fixed top-32 left-10 h-fit mt-2 w-64 bg-gray-100 dark:bg-neutral-900 p-4 shadow z-40 hidden md:block overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-[var(--primary-color)]">
              Admin Panel
            </h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActivePanel(item)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      activePanel === item
                        ? "bg-neutral-200 dark:bg-neutral-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}

              {/* Logout Button */}
              {/* <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("adminToken");
                    window.location.href = "/admin";
                  }}
                  className="w-full text-left px-2 py-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Logout
                </button>
              </li> */}
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <div className="w-full mt-16 md:mt-0  md:ml-80 px-4 md:w-3/4">
            {/* MOBILE HEADER */}
            <div className="flex fixed top-28 left-0 w-full px-5  items-center justify-between md:hidden bg-gray-100  dark:bg-neutral-900 py-4 rounded shadow mb-4">
              <h2 className="text-xl font-semibold">Access Panel</h2>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center font-semibold"
              >
                {activePanel} {mobileMenuOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
              <ul className="mb-4 bg-white text-black rounded shadow divide-y md:hidden">
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setActivePanel(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${
                        activePanel === item
                          ? "bg-blue-200 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <main className="flex-1">
              {activePanel === "Users" && (
                <section className="bg-gray-100 dark:bg-neutral-900  p-4 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">User Logins</h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          "User Logins",
                          users,
                          ["Name", "Email", "Phone"],
                          ["fullName", "email", "Phone"]
                        )
                      }
                      className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to Excel
                    </button>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="border-b pb-1">Name</th>
                        <th className="border-b pb-1">Email</th>
                        <th className="border-b pb-1">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: any) => (
                        <tr key={user._id}>
                          <td className="py-1">{user.fullName}</td>
                          <td className="py-1">{user.email}</td>
                          <td className="py-1">{user.Phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {activePanel === "Newsletter Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Newsletter Data</h2>
                    <div className="flex gap-4">
                      <a href="/newsletter">
                        <button className="border border-green-700 p-2 text-green-700 rounded-md hover:bg-green-700 hover:text-white">
                          Send Newsletter
                        </button>
                      </a>
                      <button
                        onClick={() =>
                          exportToExcel(
                            "Email Subscribers",
                            newsletterData,
                            [
                              "title",
                              "Subject",
                              "Send Date",
                              "Button Url",
                              "Status",
                              "Emails",
                            ],
                            [
                              "title",
                              "content",
                              "sentAt",
                              "ctaUrl",
                              "sent",
                              "emails",
                            ]
                          )
                        }
                        className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Export to Excel
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/6 break-words">Title</th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Subject
                          </th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Send Date
                          </th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Button URL
                          </th>

                          <th className="pb-2 px-2 w-1/6 break-words">
                            Emails
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsletterData.map((item: any) => (
                          <tr key={item._id} className=" align-top">
                            <td className="py-2 px-2 break-words">
                              {item.title}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.content}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(item.sentAt).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.ctaUrl}
                            </td>

                            <td className="py-2 px-2 break-words">
                              {item.emails}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {newsletterData.map((item: any) => (
                      <div
                        key={item._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Title:</span>{" "}
                          {item.title}
                        </p>
                        <p>
                          <span className="font-semibold">Subject:</span>{" "}
                          {item.content}
                        </p>
                        <p>
                          <span className="font-semibold">Send Date:</span>{" "}
                          {new Date(item.sentAt).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Button URL:</span>{" "}
                          {item.ctaUrl}
                        </p>

                        <p>
                          <span className="font-semibold">Emails:</span>{" "}
                          {item.emails}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Email Subscribers" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold mb-2">
                      Email Subscribers
                    </h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          `Email Subscribers${
                            subscriberFilterDate
                              ? ` ${subscriberFilterDate}`
                              : ""
                          }`,
                          filteredSubscribers,
                          ["Email", "Subscribed"],
                          ["email", "createdAt"]
                        )
                      }
                      className="p-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to Excel
                    </button>
                  </div>

                  {/* Filter by Date Input */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <label className="text-sm block">Filter by Date</label>
                        <input
                          type="date"
                          value={subscriberFilterDate}
                          onChange={(e) =>
                            setSubscriberFilterDate(e.target.value)
                          }
                          className="border px-3 py-2 rounded w-full text-black"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={() => setSubscriberFilterDate("")}
                          className="px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Clear Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="border-b pb-1">Email</th>
                        <th className="border-b pb-1">Subscribed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubscribers.map((sub: any) => (
                        <tr key={sub._id}>
                          <td className="py-1">{sub.email}</td>
                          <td className="py-1">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {activePanel === "Popup Leads" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold">Popup Leads</h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          `Popup Leads${filterDate ? ` ${filterDate}` : ""}`,
                          filteredLeads,
                          ["Name", "Email", "Phone", "Date"],
                          ["fullName", "email", "phone", "createdAt"]
                        )
                      }
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to Excel
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium py-2">
                        Filter by Date
                      </label>
                      <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border px-3 py-2 rounded w-full text-black cursor-pointer"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => setFilterDate("")}
                        className=" px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/4 break-words">Name</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Email</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Phone</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead: any) => (
                          <tr key={lead._id}>
                            <td className="py-2 px-2">{lead.fullName}</td>
                            <td className="py-2 px-2">{lead.email}</td>
                            <td className="py-2 px-2">{lead.phone}</td>
                            <td className="py-2 px-2">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {filteredLeads.map((lead: any) => (
                      <div
                        key={lead._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {lead.fullName}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {lead.email}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {lead.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Emailer Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Emailer Data</h2>
                    <div className="flex gap-4">
                      <a href="/emailer">
                        <button className="border border-green-700 p-2 text-green-700 rounded-md hover:bg-green-700 hover:text-white">
                          Send Emailer
                        </button>
                      </a>
                      <button
                        onClick={() =>
                          exportToExcel(
                            "Emailer Data",
                            filteredEmailerData,
                            [
                              "Title",
                              "Subject",
                              "CTA Text",
                              "CTA URL",
                              "Recipients",
                              "Created At",
                            ],
                            [
                              "title",
                              "subject",
                              "ctaText",
                              "ctaUrl",
                              "recipients",
                              "createdAt",
                            ]
                          )
                        }
                        className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Export to Excel
                      </button>
                    </div>
                  </div>

                  {/* Date Filter UI */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Filter by Date
                      </label>
                      <input
                        type="date"
                        value={emailerFilterDate}
                        onChange={(e) => setEmailerFilterDate(e.target.value)}
                        className="border px-3 py-2 rounded w-full text-black"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => setEmailerFilterDate("")}
                        className="px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/5 break-words">Title</th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Subject
                          </th>
                          <th className="pb-2 px-2 w-1/5 break-words">CTA</th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Recipients
                          </th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmailerData.map((item: any) => (
                          <tr key={item._id} className="align-top">
                            <td className="py-2 px-2 break-words">
                              {item.title}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.subject}
                            </td>
                            <td className="py-2 px-2 break-words">
                              <a
                                href={item.ctaUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                              >
                                {item.ctaText}
                              </a>
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.recipients.join(", ")}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {filteredEmailerData.map((item: any) => (
                      <div
                        key={item._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Title:</span>{" "}
                          {item.title}
                        </p>
                        <p>
                          <span className="font-semibold">Subject:</span>{" "}
                          {item.subject}
                        </p>
                        <p>
                          <span className="font-semibold">CTA:</span>{" "}
                          <a
                            href={item.ctaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            {item.ctaText}
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Recipients:</span>{" "}
                          {item.recipients.join(", ")}
                        </p>
                        <p>
                          <span className="font-semibold">Created At:</span>{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Blog Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold ">Blogs</h2>
                    <button
                      className="p-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        setEditingBlog(null);
                        setShowAddModal(true);
                      }}
                    >
                      Add Blog
                    </button>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 whitespace-nowrap">Title</th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Content
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Author
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Published On
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBlogs.map((blog: any) => (
                          <tr key={blog._id} className=" align-top">
                            <td className="px-4 py-2 w-1/5">{blog.title}</td>
                            <td
                              className="px-4 py-2 break-words max-w-[250px] cursor-pointer"
                              onClick={() => {
                                setSelectedBlog(blog);
                                setEditorContent(blog.content);
                                setShowContentEditor(true);
                              }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  blog.content.length > 150
                                    ? blog.content.slice(0, 140) + "..."
                                    : blog.content,
                              }}
                            />

                            <td className="px-4 py-2 whitespace-nowrap">
                              {blog.author}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {new Date(blog.datePublished).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap space-x-2">
                              <button
                                onClick={() => handleEdit(blog.slug)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(blog.slug)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {blogs.map((blog: any) => (
                      <div
                        key={blog._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p className="mb-1">
                          <strong>Title:</strong> {blog.title}
                        </p>
                        <p
                          className="mb-1 cursor-pointer"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setEditorContent(blog.content);
                            setShowContentEditor(true);
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.content.length > 150
                                ? blog.content.slice(0, 140) + "..."
                                : blog.content,
                          }}
                        />

                        <p className="mb-1">
                          <strong>Author:</strong> {blog.author}
                        </p>
                        <p className="mb-1">
                          <strong>Published:</strong>{" "}
                          {new Date(blog.datePublished).toLocaleString()}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => handleEdit(blog.slug)}
                            className="text-blue-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.slug)}
                            className="text-red-600"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal */}
                  {showAddModal && (
                    <AddBlog
                      onClose={handleModalClose}
                      onSuccess={fetchBlogs}
                      existingBlog={editingBlog}
                    />
                  )}

                  {showContentEditor && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
                      <div className="relative bg-white text-black w-full max-w-3xl mx-4 my-12 p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">
                          Edit Blog Content
                        </h3>

                        <ReactQuill
                          value={editorContent}
                          onChange={setEditorContent}
                          theme="snow"
                          className="mb-4 h-64 overflow-y-auto"
                          modules={{ toolbar: toolbarOptions }}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            onClick={() => setShowContentEditor(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `${baseURL}/api/blogs/${selectedBlog?.slug}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      content: editorContent,
                                    }),
                                  }
                                );

                                if (!res.ok)
                                  throw new Error(
                                    "Failed to update blog content"
                                  );

                                setShowContentEditor(false);
                                fetchBlogs();
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                            className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                      {[
                        1,
                        currentPage > 3 ? "..." : null,
                        currentPage > 2 ? currentPage - 1 : null,
                        currentPage !== 1 && currentPage !== totalPages
                          ? currentPage
                          : null,
                        currentPage < totalPages - 1 ? currentPage + 1 : null,
                        currentPage < totalPages - 2 ? "..." : null,
                        totalPages,
                      ]
                        .filter(
                          (item, i, self) =>
                            item !== null && self.indexOf(item) === i
                        )
                        .map((item, idx) =>
                          item === "..." ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="px-2 py-1 text-gray-500 select-none"
                            >
                              ...
                            </span>
                          ) : (
                            <button
                              key={item}
                              onClick={() => setCurrentPage(item as number)}
                              className={`px-3 py-1 rounded border ${
                                currentPage === item
                                  ? "bg-[var(--primary-color)] text-white"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              {item}
                            </button>
                          )
                        )}
                    </div>
                  )}
                </section>
              )}

              {activePanel === "Newsfeed" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Newsfeed</h2>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setNewNews({ title: "", link: "", date: "" });
                        setShowNewsfeedModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Add Newsfeed
                    </button>
                  </div>

                  {/* Table View */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/3 break-words">Title</th>
                          <th className="pb-2 px-2 w-1/3 break-words">Link</th>
                          <th className="pb-2 px-2 w-1/5 break-words">Date</th>
                          <th className="pb-2 px-2 w-1/12 text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsfeed.map((item: any) => (
                          <tr key={item._id}>
                            <td className="py-2 px-2">{item.title}</td>
                            <td className="py-2 px-2 truncate">
                              <a
                                href={item.link}
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.link}
                              </a>
                            </td>
                            <td className="py-2 px-2">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-2 text-center flex gap-2 justify-center">
                              <button
                                onClick={() => {
                                  setNewNews({
                                    title: item.title,
                                    link: item.link,
                                    date: item.date?.substring(0, 10),
                                  });
                                  setEditingId(item._id);
                                  setShowNewsfeedModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteNewsfeed(item._id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {newsfeed.map((item: any) => (
                      <div
                        key={item._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Title:</span>{" "}
                          {item.title}
                        </p>
                        <p>
                          <span className="font-semibold">Link:</span>{" "}
                          <a
                            href={item.link}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.link}
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setNewNews({
                                title: item.title,
                                link: item.link,
                                date: item.date?.substring(0, 10),
                              });
                              setEditingId(item._id);
                              setShowNewsfeedModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteNewsfeed(item._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal for Add/Edit */}
                  {showNewsfeedModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                      <div className="bg-white dark:bg-neutral-800 p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">
                          {editingId ? "Edit Newsfeed" : "Add Newsfeed"}
                        </h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Title"
                            value={newNews.title}
                            onChange={(e) =>
                              setNewNews({ ...newNews, title: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-black"
                          />
                          <input
                            type="text"
                            placeholder="Link"
                            value={newNews.link}
                            onChange={(e) =>
                              setNewNews({ ...newNews, link: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-black"
                          />
                          <input
                            type="date"
                            value={newNews.date}
                            onChange={(e) =>
                              setNewNews({ ...newNews, date: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-black"
                          />
                          <div className="flex justify-end gap-2 pt-4">
                            <button
                              onClick={() => {
                                setShowNewsfeedModal(false);
                                setEditingId(null);
                                setNewNews({ title: "", link: "", date: "" });
                              }}
                              className="px-4 py-2 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={
                                editingId ? handleEditNews : handleAddNews
                              }
                              className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              {editingId ? "Update" : "Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {activePanel === "Contact Form" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      Contact Submissions
                    </h2>
                  </div>

                  {loadingContacts ? (
                    <p className="text-center py-8 text-gray-500">Loading...</p>
                  ) : contacts.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">
                      No contacts found.
                    </p>
                  ) : (
                    <>
                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-auto">
                        <table className="w-full text-left text-sm table-fixed">
                          <thead>
                            <tr className="border-b">
                              <th className="pb-2 px-2 w-1/6">Name</th>
                              <th className="pb-2 px-2 w-1/6">Email</th>
                              <th className="pb-2 px-2 w-1/5">Subject</th>
                              <th className="pb-2 px-2 w-1/3">Message</th>
                              <th className="pb-2 px-2 w-1/12 text-center">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contacts.map((contact: any) => (
                              <tr key={contact._id} className="border-t">
                                <td className="py-2 px-2">{contact.name}</td>
                                <td className="py-2 px-2">{contact.email}</td>
                                <td className="py-2 px-2">{contact.subject}</td>
                                <td className="py-2 px-2 truncate">
                                  {contact.message}
                                </td>
                                <td className="py-2 px-2 text-center">
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    Send Mail
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="md:hidden space-y-4">
                        {contacts.map((contact: any) => (
                          <div
                            key={contact._id}
                            className="border rounded p-4 shadow-sm"
                          >
                            <p>
                              <strong>Name:</strong> {contact.name}
                            </p>
                            <p>
                              <strong>Email:</strong> {contact.email}
                            </p>
                            <p>
                              <strong>Subject:</strong> {contact.subject}
                            </p>
                            <p>
                              <strong>Message:</strong> {contact.message}
                            </p>
                            <div className="mt-2 text-right">
                              <a
                                href={`mailto:${contact.email}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                Send Mail
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              )}

              {activePanel === "Membership Requests" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Membership Requests
                  </h2>
                  <div className="overflow-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border">
                      <thead>
                        <tr className="text-left text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
                          <th className="p-3">Company Logo</th>
                          <th className="p-3">Company Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Country</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              className="p-4 text-center text-gray-500"
                            >
                              No membership requests found.
                            </td>
                          </tr>
                        ) : (
                          members.map((member) => (
                            <tr key={member._id} className="border-t text-sm">
                              <td className="p-3">
                                <img
                                  src={member.logoUrl}
                                  alt=""
                                  className="w-20"
                                />
                              </td>
                              <td className="p-3">{member.companyName}</td>
                              <td className="p-3">{member.email}</td>
                              <td className="p-3">{member.country}</td>
                              <td className="p-3">{member.telephone}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    member.status === "Approved"
                                      ? "bg-green-100 text-green-800"
                                      : member.status === "Rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {member.status || "Pending"}
                                </span>
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => {
                                    setSelectedMember(member);
                                    setShowPopup(true);
                                  }}
                                  className="text-sm px-3 py-1 bg-[var(--primary-color)] text-white rounded hover:brightness-110"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {showPopup && selectedMember && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center">
                  <div className="bg-white dark:bg-black max-w-3xl w-full p-6 rounded shadow-lg overflow-y-auto max-h-[90vh] relative">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="absolute top-4 right-4 text-xl font-bold text-gray-700 dark:text-gray-200"
                    >
                      &times;
                    </button>

                    <h3 className="text-xl font-bold mb-4 text-[var(--primary-color)]">
                      Member Application Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {/* Member Details */}
                      <p>
                        <strong>Company Name:</strong>{" "}
                        {selectedMember.companyName}
                      </p>
                      <p>
                        <strong>Legal Structure:</strong>{" "}
                        {selectedMember.legalStructure}
                      </p>
                      <p>
                        <strong>Date of Establishment:</strong>{" "}
                        {selectedMember.establishmentDate}
                      </p>
                      <p>
                        <strong>Building:</strong> {selectedMember.building}
                      </p>
                      <p>
                        <strong>Street:</strong> {selectedMember.street}
                      </p>
                      <p>
                        <strong>Area:</strong> {selectedMember.area}
                      </p>
                      <p>
                        <strong>Landmark:</strong> {selectedMember.landmark}
                      </p>
                      <p>
                        <strong>PO Box:</strong> {selectedMember.poBox}
                      </p>
                      <p>
                        <strong>State:</strong> {selectedMember.state}
                      </p>
                      <p>
                        <strong>Country:</strong> {selectedMember.country}
                      </p>
                      <p>
                        <strong>Telephone:</strong> {selectedMember.telephone}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedMember.email}
                      </p>
                      <p>
                        <strong>Business Verticals:</strong>{" "}
                        {selectedMember.businessVerticals.join(", ")}
                      </p>
                      <p>
                        <strong>Company Profile:</strong>{" "}
                        {selectedMember.companyProfile}
                      </p>
                      <p>
                        <strong>Contact Person:</strong>{" "}
                        {selectedMember.contactName}
                      </p>
                      <p>
                        <strong>Designation:</strong>{" "}
                        {selectedMember.designation}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={async () => {
                          setLoadingAction("reject");
                          try {
                            await axios.put(
                              `${baseURL}/api/members/status/${selectedMember._id}`,
                              { status: "Rejected" }
                            );
                            setShowPopup(false);
                            fetchMembers();
                          } catch (err) {
                            alert("Failed to reject");
                          } finally {
                            setLoadingAction(null);
                          }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                        disabled={loadingAction !== null}
                      >
                        {loadingAction === "reject" ? "Rejecting..." : "Reject"}
                      </button>

                      <button
                        onClick={async () => {
                          setLoadingAction("approve");
                          try {
                            await axios.put(
                              `${baseURL}/api/members/status/${selectedMember._id}`,
                              { status: "Approved" }
                            );
                            setShowPopup(false);
                            fetchMembers();
                          } catch (err) {
                            alert("Failed to approve");
                          } finally {
                            setLoadingAction(null);
                          }
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        disabled={loadingAction !== null}
                      >
                        {loadingAction === "approve"
                          ? "Accepting..."
                          : "Approve"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "Information Pop-up" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Information</h2>
                    <button
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        setEditingOffer(null);
                        setShowOfferModal(true);
                      }}
                    >
                      Add Information
                    </button>
                  </div>

                  <div className="overflow-auto">
                    <table className="w-full text-left text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2">Title</th>
                          <th className="px-4 py-2">Subtitle</th>

                          <th className="px-4 py-2">Start</th>
                          <th className="px-4 py-2">End</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {offers.map((offer) => (
                          <tr key={offer._id} className="border-t align-top">
                            <td className="px-4 py-2">{offer.title}</td>
                            <td className="px-4 py-2">{offer.subtitle}</td>

                            <td className="px-4 py-2">
                              {offer.startDate?.slice(0, 10)}
                            </td>
                            <td className="px-4 py-2">
                              {offer.endDate?.slice(0, 10)}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingOffer(offer);
                                  setShowOfferModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm("Delete this offer?")) {
                                    try {
                                      await axios.delete(
                                        `${baseURL}/api/offer/${offer._id}`
                                      );
                                      setOffers((prev) =>
                                        prev.filter((o) => o._id !== offer._id)
                                      );
                                    } catch (err) {
                                      alert("Delete failed");
                                    }
                                  }
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {showOfferModal && (
                    <AddOffer
                      existingOffer={editingOffer}
                      onClose={() => {
                        setShowOfferModal(false);
                        setEditingOffer(null);
                      }}
                      onSuccess={() => {
                        axios
                          .get(`${baseURL}/api/offer/view`)
                          .then((res) => setOffers(res.data));
                      }}
                    />
                  )}
                </section>
              )}

              {activePanel === "AGM" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">AGM Content</h2>
                    <button
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        setEditingAgm(null);
                        setShowAgmModal(true);
                      }}
                    >
                      Add AGM
                    </button>
                  </div>

                  <div className="overflow-auto">
                    <table className="w-full text-left text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2">Title</th>
                          <th className="px-4 py-2">Subtitle</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agms.map((agm) => (
                          <tr key={agm._id} className="border-t align-top">
                            <td className="px-4 py-2">{agm.title}</td>
                            <td className="px-4 py-2">{agm.subtitle}</td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingAgm(agm);
                                  setShowAgmModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm("Delete this AGM entry?")) {
                                    await axios.delete(
                                      `${baseURL}/agm/${agm._id}`
                                    );
                                    fetchAgms();
                                  }
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {showAgmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
                      <div className="bg-white dark:bg-neutral-800 w-[95%] max-w-2xl p-6 rounded shadow-lg relative max-h-[90vh] overflow-hidden">
                        <h2 className="text-lg font-semibold mb-4">
                          {editingAgm ? "Edit AGM" : "Add AGM"}
                        </h2>

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setIsSubmitting(true);

                            try {
                              const formData = new FormData();
                              formData.append("title", title);
                              formData.append("subtitle", subtitle);
                              formData.append("content", content);
                              if (imageFile) {
                                formData.append("image", imageFile); // important!
                              }

                              if (editingAgm) {
                                // PUT with multipart/form-data (some setups may require `methodOverride`)
                                await axios.put(
                                  `${baseURL}/agm/${editingAgm._id}`,
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                              } else {
                                // POST for new record
                                await axios.post(`${baseURL}/agm`, formData, {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                });
                              }

                              setShowAgmModal(false);
                              setEditingAgm(null);
                              fetchAgms();
                            } catch (err) {
                              alert("Something went wrong");
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                          className="overflow-y-auto max-h-[70vh] pr-1"
                        >
                          <input
                            type="text"
                            placeholder="Title"
                            className="w-full mb-3 p-2 border rounded text-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Subtitle"
                            className="w-full mb-3 p-2 border rounded text-black"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            required
                          />
                          <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="bg-white text-black mb-4"
                          />

                          <input
                            type="file"
                            accept="image/*"
                            className="mb-3"
                            onChange={(e) =>
                              setImageFile(e.target.files?.[0] || null)
                            }
                          />

                          {existingImageUrl && !imageFile && (
                            <img
                              src={existingImageUrl}
                              alt="Current"
                              className="mb-3 w-32 h-auto rounded border"
                            />
                          )}

                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-300 dark:bg-neutral-600 rounded"
                              onClick={() => {
                                setShowAgmModal(false);
                                setEditingAgm(null);
                              }}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? editingAgm
                                  ? "Updating..."
                                  : "Adding..."
                                : editingAgm
                                ? "Update"
                                : "Create"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
