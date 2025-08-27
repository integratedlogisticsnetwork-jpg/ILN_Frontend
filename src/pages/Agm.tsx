import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero from "../assets/agm.jpeg";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type AgmType = {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  createdAt?: string;
};

const Agm: React.FC = () => {
  const [agm, setAgm] = useState<AgmType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgm = async () => {
      try {
        const res = await axios.get<AgmType[]>(`${baseURL}/agm`);
        if (res.data && res.data.length > 0) {
          // Sort by createdAt descending and take the latest
          const sorted = res.data.sort(
            (a, b) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
          );
          setAgm(sorted[0]);
        }
      } catch (err) {
        console.error("Failed to load AGM content", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgm();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading AGM content...</p>
      </div>
    );
  }

  if (!agm) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">No AGM content available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      {/* Hero */}
      <div className="relative  object-contain w-full overflow-hidden">
        <img src={hero} alt="Hero" className="w-full h-full object-cover" />
      </div>
      <div className="w-11/12 md:w-5/6 mx-auto px-4 py-10">
        <h1 className="text-center text-3xl font-bold text-[var(--primary-color)] mb-2">
          {agm.title}
        </h1>
        <p className="text-center text-xl mt-5 text-gray-600 dark:text-gray-300 mb-6">
          {agm.subtitle}
        </p>

        {/* {agm.image && (
          <div className="flex justify-center mb-6">
            <img
              src={agm.image}
              alt="AGM visual"
              className="max-h-[400px] w-auto rounded-lg shadow-lg"
            />
          </div>
        )} */}

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:my-2 prose-p:my-2 prose-li:my-1 mt-6">
          <div dangerouslySetInnerHTML={{ __html: agm.content }} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agm;
