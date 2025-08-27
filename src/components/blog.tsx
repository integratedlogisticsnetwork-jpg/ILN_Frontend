import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface BlogType {
  _id: string;
  title: string;
  coverImage: string;
  datePublished: string;
  slug: string;
}

// Custom Arrows for Desktop
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="hidden md:flex absolute top-1/2 -right-20 transform -translate-y-1/2 z-10 bg-[var(--primary-color)] text-white p-3 rounded-full hover:opacity-80"
      onClick={onClick}
    >
      <FiChevronRight size={20} />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="hidden md:flex absolute top-1/2 -left-20 transform -translate-y-1/2 z-10 bg-[var(--primary-color)] text-white p-3 rounded-full hover:opacity-80"
      onClick={onClick}
    >
      <FiChevronLeft size={20} />
    </button>
  );
};

const Insights = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/blogs/viewblog`);
        const limited = res.data.slice(0, 4); // Only take first 4 blogs
        setBlogs(limited);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center mt-4 gap-2">{dots}</div>
    ),
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600 dark:text-gray-300">
        Loading insights...
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400 text-xl">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="px-4 py-10 bg-[var(--bg-color2)] dark:bg-[var(--bg-color1)] font-['PT_Serif'] dark:text-white text-[var(--secondary-color)] font-raleway font-light dark:font-thin gradient-top relative">
      <h2 className="text-4xl font-bold text-center">INSIGHTS</h2>

      <div className="relative w-11/12 md:w-5/6 mx-auto mt-8">
        <Slider {...settings}>
          {blogs.map((item, i) => (
            <div key={item._id || i}>
              <div className="border border-gray-300 dark:border-gray-600 flex flex-col lg:flex-row w-full h-[450px] md:h-[350px] overflow-hidden bg-white dark:bg-black">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full lg:w-1/2 h-full object-cover"
                  draggable={false}
                />
                <div className="p-8 flex flex-col justify-center w-full h-full bg-[var(--bg-color2)] dark:bg-[var(--bg-color1)] overflow-hidden">
                  <h3 className="text-2xl font-thin line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {new Date(item.datePublished).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => navigate(`/blogs/${item.slug}`)}
                    className="mt-6 rounded-tl-2xl rounded-br-2xl bg-[var(--primary-color)] text-white text-md font-light hover:opacity-70 px-6 py-2 uppercase tracking-wide transition w-fit"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Insights;
