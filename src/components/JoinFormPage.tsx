import React, { useState } from "react";
// import logo1 from "../assets/ILN Logo v2.png";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const InputField = ({ label, name, value, onChange, ...props }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, ...props }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
    />
  </div>
);

const MultiSelectField = ({ label, options, selected, setSelected }: any) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((o: string) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 p-2 flex flex-wrap gap-2">
        {options.map((option: string) => (
          <button
            type="button"
            key={option}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selected.includes(option)
                ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300"
            }`}
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const JoinFormPage = () => {
  const [verticals, setVerticals] = useState<string[]>([]);
  const [logo, setLogo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    legalStructure: "",
    taxId: "",
    yearsInBusiness: "",
    establishmentDate: "",
    building: "",
    street: "",
    area: "",
    landmark: "",
    poBox: "",
    state: "",
    country: "",
    telephone: "",
    email: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    companyProfile: "",
    contactName: "",
    designation: "",
    website: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [tradeReferences, setTradeReferences] = useState([
    { name: "", designation: "", email: "", phone: "" },
    { name: "", designation: "", email: "", phone: "" },
    { name: "", designation: "", email: "", phone: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [_errorMsg, setErrorMsg] = useState("");

  const businessOptions = [
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

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "companyProfile") {
      const words = countWords(value);
      if (words <= 500) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    // Allow only numbers in phone fields
    const phoneFields = ["telephone", "primaryContactPhone"];
    if (phoneFields.includes(name)) {
      const filteredValue = value.replace(/[^\d]/g, "");
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
      return;
    }

    // Allow only numbers in yearsInBusiness
    if (name === "yearsInBusiness") {
      const filteredValue = value.replace(/[^\d]/g, "");
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTradeRefChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setTradeReferences((prev) => {
      const updated = [...prev];

      // allow only digits in trade ref phone
      if (field === "phone") {
        value = value.replace(/[^\d]/g, "");
      }

      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!logo) {
      setErrorMsg("Company Profile Logo is required.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Logo Required",
        text: "Please upload a company profile logo.",
        confirmButtonColor: "var(--primary-color)",
      });
      return;
    }

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      formPayload.append("businessVerticals", JSON.stringify(verticals));
      formPayload.append("logo", logo);
      formPayload.append("tradeReferences", JSON.stringify(tradeReferences));
      formPayload.append("termsAccepted", String(termsAccepted));

      const response = await fetch(`${baseURL}/api/members`, {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          companyName: "",
          legalStructure: "",
          taxId: "",
          yearsInBusiness: "",
          establishmentDate: "",
          building: "",
          street: "",
          area: "",
          landmark: "",
          poBox: "",
          state: "",
          country: "",
          telephone: "",
          email: "",
          companyProfile: "",
          contactName: "",
          designation: "",
          primaryContactEmail: "",
          primaryContactPhone: "",
          website: "",
        });
        setVerticals([]);
        setLogo(null);
        setTradeReferences([
          { name: "", designation: "", email: "", phone: "" },
          { name: "", designation: "", email: "", phone: "" },
          { name: "", designation: "", email: "", phone: "" },
        ]);

        setTermsAccepted(false);

        setLoading(false);

        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          html: `
            <p>Your member application has been submitted successfully.</p>
            <p class="mt-2">We’ve also sent an email with further instructions. Please check your inbox and share the required documents for verification.</p>
          `,
          confirmButtonColor: "var(--primary-color)",
        });
      } else {
        const errorMessage = data?.error || "Something went wrong.";
        setErrorMsg(errorMessage);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: errorMessage,
          confirmButtonColor: "var(--primary-color)",
        });
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection and try again.",
        confirmButtonColor: "var(--primary-color)",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-[var(--bg-color1)]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 ">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--primary-color)]">
          Join the ILN Community
        </h1>

        <form
          className="space-y-8 text-sm text-black dark:text-white"
          onSubmit={handleSubmit}
        >
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Company Name *"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Legal Structure *"
              name="legalStructure"
              value={formData.legalStructure}
              onChange={handleChange}
              required
            />
            <InputField
              label="Applicant's Tax ID"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
            />

            <InputField
              label="Years in Business"
              name="yearsInBusiness"
              value={formData.yearsInBusiness}
              onChange={handleChange}
              type="text"
            />
            <InputField
              label="Date of Establishment *"
              name="establishmentDate"
              type="date"
              value={formData.establishmentDate}
              onChange={handleChange}
              required
            />
            <InputField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Telephone *"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </section>

          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-xl p-6">
            <legend className="px-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Registered Office
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label="Building Name & Office Number *"
                name="building"
                value={formData.building}
                onChange={handleChange}
                required
              />
              <InputField
                label="Street *"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              <InputField
                label="Area *"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
              <InputField
                label="Nearest Landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
              <InputField
                label="PO Box"
                name="poBox"
                value={formData.poBox}
                onChange={handleChange}
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <InputField
                label="Country *"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <MultiSelectField
            label="Specialized Verticals * (Note: Select only those that apply)"
            options={businessOptions}
            selected={verticals}
            setSelected={setVerticals}
          />

          <TextareaField
            label="Company Profile (Not Exceeding 500 words)*"
            name="companyProfile"
            value={formData.companyProfile}
            onChange={handleChange}
            rows={4}
            required
          />
          <p className="text-sm text-right text-gray-500 dark:text-gray-400">
            {countWords(formData.companyProfile)} / 500
          </p>

          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-xl p-6">
            <legend className="px-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Primary Member
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label="Name *"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
              />

              <InputField
                label="Phone No *"
                name="primaryContactPhone"
                value={formData.primaryContactPhone}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email"
                name="primaryContactEmail"
                value={formData.primaryContactEmail}
                onChange={handleChange}
              />
              <InputField
                label="Designation *"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-xl p-6">
            <legend className="px-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
              Trade References (Global) *
            </legend>

            <div className="flex flex-col gap-8 mt-4">
              {tradeReferences.map((ref, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                >
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Reference {index + 1}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Name *"
                      name={`tradeRefName-${index}`}
                      value={ref.name}
                      onChange={(e: any) =>
                        handleTradeRefChange(index, "name", e.target.value)
                      }
                      required
                    />

                    <InputField
                      label="Designation (Management) *"
                      name={`tradeRefDesignation-${index}`}
                      value={ref.designation}
                      onChange={(e: any) =>
                        handleTradeRefChange(
                          index,
                          "designation",
                          e.target.value
                        )
                      }
                      required
                    />

                    <InputField
                      label="Email *"
                      type="email"
                      name={`tradeRefEmail-${index}`}
                      value={ref.email}
                      onChange={(e: any) =>
                        handleTradeRefChange(index, "email", e.target.value)
                      }
                      required
                    />

                    <InputField
                      label="Direct Phone / Mobile *"
                      name={`tradeRefPhone-${index}`}
                      value={ref.phone}
                      onChange={(e: any) =>
                        handleTradeRefChange(index, "phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Profile Logo *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition file:text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[var(--primary-color)] file:text-white hover:file:brightness-110"
            />
          </div>

          <div className="border border-gray-300 dark:border-gray-700 rounded-xl p-5">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              By submitting this form, you acknowledge that ILN Management will
              conduct a formal due diligence review, which ensures the security
              and financial integrity of our global membership. You will receive
              a personal notification regarding the status of your application
              once this review is completed.
            </p>

            <label className="mt-4 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--primary-color)]"
                required
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I acknowledge and agree to the due diligence review process.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 bg-[var(--primary-color)] text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default JoinFormPage;
