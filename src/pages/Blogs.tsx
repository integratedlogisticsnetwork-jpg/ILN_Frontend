import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  slug: string;
  tags: string[];
};

const Blog2 = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/blogs/viewblog`);
      setBlogPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blog posts");
      setLoading(false);
    }
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-[var(--primary-color)] rounded-full animate-spin"></div>
        <p className="text-white mt-4">Processing your data. Please wait...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white">
      <Navbar />
      <div className="py-16 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Latest{" "}
            <span className="text-[var(--primary-color)] italic">
              Blog Updates
            </span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="cursor-pointer relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
              style={{
                background:
                  "linear-gradient(to bottom, #111, var(--primary-color))",
              }}
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="bg-white dark:bg-black rounded-lg h-[450px] flex flex-col overflow-hidden text-left">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-[300px] object-fill rounded-t-lg"
                />
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-black dark:text-white leading-snug mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 truncate">
                      {post.excerpt}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    By {post.author} •{" "}
                    {new Date(post.datePublished).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page <= 3 ||
                  page > totalPages - 2 ||
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1
                );
              })
              .reduce((acc: (number | string)[], page, i, arr) => {
                if (
                  i > 0 &&
                  typeof arr[i - 1] === "number" &&
                  page - (arr[i - 1] as number) > 1
                ) {
                  acc.push("......");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item as number)}
                    className={`px-4 py-2 rounded ${
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
      </div>
      <Footer />
    </div>
  );
};

export default Blog2;
