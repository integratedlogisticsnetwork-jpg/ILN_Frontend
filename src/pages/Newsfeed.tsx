import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import newsfeed from "../assets/newsfeed.jpeg";

function Newsfeed() {
  const [articles, setArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;

  useEffect(() => {
    const fetchNewsfeed = async () => {
      try {
        const rssUrl =
          "https://www.supplychainbrain.com/rss/topic/1135-logistics";

        // AllOrigins proxy (CORS bypass)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          rssUrl
        )}`;

        const res = await axios.get(proxyUrl);

        // XML string
        const xmlString = res.data.contents;

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");

        const items = Array.from(xml.querySelectorAll("item")).map((item) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";

          return {
            title,
            link,
            date: pubDate,
          };
        });

        setArticles(items);
      } catch (err) {
        console.error("Failed to fetch RSS newsfeed", err);
      }
    };

    fetchNewsfeed();
  }, []);
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const d = new Date(dateString);

    if (isNaN(d.getTime())) {
      // fallback: show raw RSS date
      return dateString;
    }

    return d.toLocaleDateString();
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="dark:bg-[var(--secondary-color)]">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={newsfeed}
          alt="Newsfeed"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg text-center px-4">
            Newsfeed
          </h1>
        </div>
      </div>

      {/* News List */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">
            No news available at the moment.
          </p>
        ) : (
          <>
            <ul className="space-y-6">
              {currentArticles.map((article, index) => (
                <li key={index} className="border-b pb-4">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md text-[var(--primary-color)] hover:underline block"
                  >
                    {article.title}
                  </a>

                  <p className="text-gray-500 text-sm">
                    {formatDate(article.date)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Pagination buttons (same as your code) */}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Newsfeed;
