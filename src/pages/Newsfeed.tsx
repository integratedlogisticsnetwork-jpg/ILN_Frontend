import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import newsfeed from "../assets/newsfeed.jpeg";

type Article = {
  title: string;
  link: string;
  date: string;
  source: string;
};

function Newsfeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // ✅ Loader State

  const articlesPerPage = 15;
  const maxPages = 3; // ✅ Client wants only 3 pagination pages
  const maxArticles = articlesPerPage * maxPages; // ✅ 15 * 3 = 45 articles max

  // ✅ Safe Date Formatter
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString();
  };

  // ✅ Convert date to timestamp for sorting
  const getDateTime = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 0;
    return d.getTime();
  };

  // ✅ Parse RSS XML -> Articles
  const parseRSSXml = (xmlString: string, sourceName: string): Article[] => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");

    const items = Array.from(xml.querySelectorAll("item")).map((item) => {
      const title = (item.querySelector("title")?.textContent || "").trim();
      const link = (item.querySelector("link")?.textContent || "").trim();

      const pubDate =
        (item.querySelector("pubDate")?.textContent || "").trim() ||
        (item.querySelector("dc\\:date")?.textContent || "").trim();

      return {
        title,
        link,
        date: pubDate,
        source: sourceName,
      } as Article;
    });

    return items;
  };

  // ✅ Try Fetch RSS using AllOrigins RAW
  const fetchWithAllOrigins = async (rssUrl: string, sourceName: string) => {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
      rssUrl,
    )}`;

    const res = await axios.get(proxyUrl, {
      timeout: 15000,
    });

    return parseRSSXml(res.data, sourceName);
  };

  // ✅ Fallback fetch using rss2json
  const fetchWithRss2Json = async (rssUrl: string, sourceName: string) => {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      rssUrl,
    )}`;

    const res = await axios.get(apiUrl, {
      timeout: 15000,
    });

    const items = res.data?.items || [];

    return items.map((item: any) => ({
      title: item.title || "",
      link: item.link || "",
      date: item.pubDate || item.isoDate || "",
      source: sourceName,
    })) as Article[];
  };

  // ✅ Main fetch (with fallback)
  const fetchRssFeed = async (rssUrl: string, sourceName: string) => {
    try {
      return await fetchWithAllOrigins(rssUrl, sourceName);
    } catch (err) {
      console.warn(
        `AllOrigins failed for ${sourceName}, trying rss2json...`,
        err,
      );
      return await fetchWithRss2Json(rssUrl, sourceName);
    }
  };

  useEffect(() => {
    const fetchAllFeeds = async () => {
      setLoading(true);

      try {
        const supplyChainBrainUrl =
          "https://www.supplychainbrain.com/rss/topic/1135-logistics";

        const gCaptainUrl = "https://gcaptain.com/category/shipping/feed/";

        const loadstarUrl = "https://theloadstar.com/feed/";
        const cargoFactsUrl = "https://cargofacts.com/feed/";

        // ✅ AviationWeek (rss.app working feed you gave)
        const aviationWeekUrl =
          "https://aviationweek.com/awn/rss-feed-by-content-source";

        const results = await Promise.allSettled([
          fetchRssFeed(supplyChainBrainUrl, "SupplyChainBrain"),
          fetchRssFeed(gCaptainUrl, "gCaptain"),
          fetchRssFeed(loadstarUrl, "The Loadstar"),
          fetchRssFeed(cargoFactsUrl, "CargoFacts"),
          fetchRssFeed(aviationWeekUrl, "AviationWeek"),
        ]);

        const merged: Article[] = [];

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            merged.push(...result.value);
          } else {
            console.error("One RSS feed failed:", result.reason);
          }
        });

        // ✅ Remove duplicates by link
        const unique = new Map<string, Article>();
        merged.forEach((item) => {
          if (item.link) unique.set(item.link, item);
        });

        const finalList = Array.from(unique.values());

        // ✅ Sort latest first
        finalList.sort((a, b) => getDateTime(b.date) - getDateTime(a.date));

        // ✅ LIMIT TO ONLY 3 PAGINATION PAGES (MAX 45 ARTICLES)
        const limitedList = finalList.slice(0, maxArticles);

        setArticles(limitedList);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch feeds", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFeeds();
  }, []);

  // ✅ Pagination calculation
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const currentArticles = useMemo(() => {
    return articles.slice(
      (currentPage - 1) * articlesPerPage,
      currentPage * articlesPerPage,
    );
  }, [articles, currentPage]);

  // ✅ Only show page numbers upto 3
  const getPageNumbers = () => {
    const pages: number[] = [];
    const total = Math.min(totalPages, maxPages);

    for (let i = 1; i <= total; i++) {
      pages.push(i);
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
        {loading ? (
          // ✅ Loader UI
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--primary-color)] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 text-sm">Loading news...</p>
          </div>
        ) : articles.length === 0 ? (
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

                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-gray-500 text-sm">
                      {formatDate(article.date)}
                    </p>

                    <span className="text-xs px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                      {article.source}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* ✅ Pagination (Only 3 pages max) */}
            <div className="mt-10 flex justify-center gap-2 flex-wrap">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    page === currentPage
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } hover:bg-[var(--primary-color-light)] dark:hover:bg-gray-600`}
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
