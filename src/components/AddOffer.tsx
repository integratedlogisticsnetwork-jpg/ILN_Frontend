import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type Offer = {
  _id?: string;
  title: string;
  subtitle?: string;
  bannerImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
};

type Props = {
  existingOffer?: Offer | null;
  onClose: () => void;
  onSuccess: () => void;
};

const AddOffer: React.FC<Props> = ({ existingOffer, onClose, onSuccess }) => {
  const [form, setForm] = useState<Offer>({
    title: "",
    subtitle: "",
    bannerImage: "",
    ctaLabel: "",
    ctaLink: "",
    startDate: "",
    endDate: "",
  });

  const [popupFile, setPopupFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingOffer) {
      setForm(existingOffer);
      setPopupFile(null);
      setBannerFile(null);
    }
  }, [existingOffer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "popupImage" | "bannerImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    if (type === "popupImage") {
      setPopupFile(file);
      setForm((prev) => ({ ...prev, popupImage: previewUrl }));
    } else {
      setBannerFile(file);
      setForm((prev) => ({ ...prev, bannerImage: previewUrl }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // start loader

      const isEditing = !!existingOffer;
      const useFormData = isEditing && (bannerFile || popupFile);

      if (useFormData) {
        const formData = new FormData();
        formData.append("title", form.title);
        if (form.subtitle) formData.append("subtitle", form.subtitle);
        if (form.ctaLabel) formData.append("ctaLabel", form.ctaLabel);
        if (form.ctaLink) formData.append("ctaLink", form.ctaLink);
        if (form.startDate) formData.append("startDate", form.startDate);
        if (form.endDate) formData.append("endDate", form.endDate);
        if (popupFile) formData.append("popupImage", popupFile);
        if (bannerFile) formData.append("bannerImage", bannerFile);

        await axios.put(
          `${baseURL}/api/offer/${existingOffer!._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else if (isEditing) {
        await axios.put(`${baseURL}/api/offer/${existingOffer!._id}`, {
          ...form,
          startDate: form.startDate || null,
          endDate: form.endDate || null,
        });
      } else {
        const formData = new FormData();
        formData.append("title", form.title);
        if (form.subtitle) formData.append("subtitle", form.subtitle);
        if (form.ctaLabel) formData.append("ctaLabel", form.ctaLabel);
        if (form.ctaLink) formData.append("ctaLink", form.ctaLink);
        if (form.startDate) formData.append("startDate", form.startDate);
        if (form.endDate) formData.append("endDate", form.endDate);
        if (bannerFile) formData.append("bannerImage", bannerFile);
        if (popupFile) formData.append("popupImage", popupFile);

        await axios.post(`${baseURL}/api/offer/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save offer", err);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto mt-5">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl my-10 p-6 space-y-4 max-h-[85vh] overflow-y-auto text-black">
        <h2 className="text-xl font-semibold">
          {existingOffer ? "Edit Information" : "Add Information"}
        </h2>

        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black"
          />

          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black"
          />

          <input
            type="text"
            name="ctaLabel"
            placeholder="CTA Label"
            value={form.ctaLabel || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black"
          />

          <input
            type="text"
            name="ctaLink"
            placeholder="CTA Link"
            value={form.ctaLink || ""}
            onChange={handleChange}
            className="border px-3 py-2 rounded text-black"
          />

          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full text-black"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Is Active</label>
            <select
              name="isActive"
              value={form.isActive ? "true" : "false"}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isActive: e.target.value === "true",
                }))
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div> */}
          {/* 
          <div>
            <label className="block text-sm font-medium">Popup Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "popupImage")}
              className="block w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Image should be less than <strong>1MB</strong> and size{" "}
              <strong>297×170 px</strong>
            </p>
            {form.popupImage && (
              <img
                src={form.popupImage}
                alt="Popup Preview"
                className="mt-2 rounded max-h-32"
              />
            )}
          </div> */}

          <div>
            <label className="block text-sm font-medium">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "bannerImage")}
              className="block w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Image should be less than <strong>1MB</strong> and size{" "}
              <strong>297×170 px</strong>
            </p>
            {form.bannerImage && (
              <img
                src={form.bannerImage}
                alt="Banner Preview"
                className="mt-2 rounded max-h-32"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>{existingOffer ? "Update" : "Create"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOffer;
