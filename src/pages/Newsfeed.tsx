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

        // ✅ AllOrigins proxy (CORS bypass)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          rssUrl
        )}`;

        const res = await axios.get(proxyUrl);

        const xmlString = res.data.contents;

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");

        const items = Array.from(xml.querySelectorAll("item")).map((item) => {
          const title = (item.querySelector("title")?.textContent || "").trim();
          const link = (item.querySelector("link")?.textContent || "").trim();
          const pubDate = (
            item.querySelector("pubDate")?.textContent || ""
          ).trim();

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

  // ✅ Format Date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const d = new Date(dateString);

    if (isNaN(d.getTime())) {
      return dateString; // fallback raw date
    }

    return d.toLocaleDateString();
  };

  // ✅ Pagination calculations
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const visiblePages = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= visiblePages + 1) {
        for (let i = 1; i <= visiblePages + 2; i++) pages.push(i);
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - visiblePages) {
        pages.push(1, "...");
        for (let i = totalPages - (visiblePages + 1); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }

    return pages;
  };

  // ✅ Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-2 flex-wrap">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    page === currentPage
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } ${
                    page === "..."
                      ? "cursor-default"
                      : "hover:bg-[var(--primary-color-light)] dark:hover:bg-gray-600"
                  }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Newsfeed;
