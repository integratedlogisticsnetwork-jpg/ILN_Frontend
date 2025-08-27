import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import logo from "../assets/ILN Logo v2.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    title: "",
    content: "",
    ctaText: "",
    ctaUrl: "",
    imageUrl: "",
    scheduleAt: "",
    emails: "",
    sendToAll: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isCheckbox = (input: EventTarget): input is HTMLInputElement =>
      (input as HTMLInputElement).type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox(e.target)
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      subject: form.subject,
      title: form.title,
      content: form.content,
      ctaText: form.ctaText,
      ctaUrl: form.ctaUrl,
      imageUrl: form.imageUrl,
      scheduleAt: form.scheduleAt
        ? new Date(form.scheduleAt).toISOString()
        : undefined,
      sendToAll: form.sendToAll,
      emails: form.sendToAll
        ? undefined
        : form.emails.split(",").map((email) => email.trim()),
    };

    try {
      await axios.post(`${baseURL}/send-newsletter`, payload);

      const scheduledTime = form.scheduleAt
        ? new Date(form.scheduleAt).toLocaleString()
        : null;

      toast.success(
        scheduledTime
          ? `✅ Newsletter scheduled for ${scheduledTime}`
          : `✅ Newsletter sent successfully!`
      );

      setForm({
        subject: "",
        title: "",
        content: "",
        ctaText: "",
        ctaUrl: "",
        imageUrl: "",
        scheduleAt: "",
        emails: "",
        sendToAll: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send/schedule newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-black">
      {/* Navbar */}
      <nav className=" shadow py-2 px-6">
        <a href="/adminPage">
          <img src={logo} alt="ILN Logo" className="h-24" draggable="false" />
        </a>
      </nav>
      <h2 className="text-3xl font-semibold text-center mt-5">
        📬 Send Newsletter
      </h2>

      {/* Responsive Grid Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className=" p-6 rounded shadow space-y-5">
          {[
            { label: "Subject", name: "subject" },
            { label: "Title", name: "title" },
            { label: "Button Text", name: "ctaText" },
            { label: "Button URL", name: "ctaUrl", type: "url" },
            { label: "Image URL (optional)", name: "imageUrl" },
            {
              label: "Schedule At",
              name: "scheduleAt",
              type: "datetime-local",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name as keyof typeof form] as string}
                onChange={handleChange}
                className="w-full p-2  border border-gray-600 text-white"
                required={!["imageUrl", "scheduleAt"].includes(field.name)}
              />
            </div>
          ))}

          <div>
            <label className="block mb-1">Content (Plain Text)</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder={`Example: We launched a new feature.`}
              className="w-full p-2  border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Recipients</label>
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name="sendToAll"
                checked={form.sendToAll}
                onChange={handleChange}
              />
              <span>Send to All Subscribers</span>
            </label>

            {!form.sendToAll && (
              <textarea
                name="emails"
                placeholder="Enter comma-separated emails"
                value={form.emails}
                onChange={handleChange}
                className="w-full p-2  border border-gray-600 text-white"
                rows={3}
                required
              />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-fit flex justify-center items-center bg-[var(--primary-color)] rounded-tl-2xl rounded-br-2xl  text-white font-medium py-2 px-6 hover:opacity-80 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
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
              ) : form.scheduleAt ? (
                "Schedule Newsletter"
              ) : (
                "Send Newsletter"
              )}
            </button>
          </div>
        </form>

        {/* Right: Preview */}
        <div className=" p-6 rounded shadow space-y-4">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            🧾 Preview
          </h3>

          <p className="text-lg">{form.subject}</p>

          <h2 className="text-2xl font-bold">{form.title}</h2>

          <div className="text-sm whitespace-pre-wrap">{form.content}</div>

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Newsletter"
              className="w-full rounded border border-gray-700"
            />
          )}

          {form.ctaText && (
            <a
              href={form.ctaUrl || "#"}
              className="inline-block mt-4 px-4 py-2 bg-[var(--primary-color)] text-black font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.ctaText}
            </a>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default NewsletterForm;
