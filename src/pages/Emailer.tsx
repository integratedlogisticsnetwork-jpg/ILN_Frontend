import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/ILN Logo v2.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Emailer = () => {
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    title: "",
    content: "",
    ctaText: "",
    ctaUrl: "",
    imageUrl: "",
    emails: "",
    sendToAll: true,
  });
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("subject", form.subject);
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("ctaText", form.ctaText);
    formData.append("ctaUrl", form.ctaUrl);
    formData.append("imageUrl", form.imageUrl);
    formData.append("sendToAll", form.sendToAll.toString());

    if (!form.sendToAll) {
      form.emails
        .split(",")
        .map((email) => email.trim())
        .forEach((email) => formData.append("emails", email));
    }

    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i]);
      }
    }

    try {
      await axios.post(`${baseURL}/send-emailer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Email sent successfully!");

      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 3000);

      setForm({
        subject: "",
        title: "",
        content: "",
        ctaText: "",
        ctaUrl: "",
        imageUrl: "",
        emails: "",
        sendToAll: true,
      });
      setAttachments(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Navbar */}
      <nav className="shadow px-6 py-3">
        <a href="/adminPage">
          <img src={logo} alt="ILN Logo" className="h-24" draggable="false" />
        </a>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold mb-4 text-center">📧 Send Emailer</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 shadow w-full lg:w-1/2  p-6"
          >
            {[
              { label: "Subject", name: "subject" },
              { label: "Title", name: "title" },
              { label: "Button Text", name: "ctaText" },
              { label: "Button URL", name: "ctaUrl" },
            ].map((field) => {
              const value = form[field.name as keyof typeof form];
              return (
                <div key={field.name}>
                  <label className="block mb-1">{field.label}</label>
                  <input
                    name={field.name}
                    value={typeof value === "string" ? value : ""}
                    onChange={handleChange}
                    className="w-full p-2  border border-gray-600"
                    required
                  />
                </div>
              );
            })}

            <div>
              <label className="block mb-1">Image URL (Optional)</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full p-2  border border-gray-600"
              />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={5}
                className="w-full p-2  border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Attachments</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-white"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="sendToAll"
                  checked={form.sendToAll}
                  onChange={handleChange}
                />
                <span>Send to All Subscribers</span>
              </label>
            </div>
            {!form.sendToAll && (
              <div>
                <label className="block mb-1">Emails (comma-separated)</label>
                <textarea
                  name="emails"
                  value={form.emails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2  border border-gray-600"
                  required
                />
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--primary-color)] text-black font-medium py-2 px-6 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-tl-2xl rounded-br-2xl"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </form>

          {/* Preview */}
          <div className="w-full lg:w-1/2 border border-gray-600 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">📄 Preview</h2>
            <h3 className="text-2xl font-bold mb-2">{form.title}</h3>
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Email Banner"
                className="w-full h-auto rounded mb-4"
              />
            )}
            <p className="mb-4 whitespace-pre-wrap">{form.content}</p>
            {form.ctaText && form.ctaUrl && (
              <a
                href={form.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-[var(--primary-color)] text-black px-4 py-2 rounded hover:opacity-80"
              >
                {form.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black px-8 py-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold">✅ Email Sent Successfully!</h2>
            <p className="mt-2">
              Your email has been sent to the selected recipients.
            </p>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Emailer;
