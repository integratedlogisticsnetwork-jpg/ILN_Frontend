import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
  name: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "vikram patel",
    content:
      "I was initially hesitant about investing in Goa, but after speaking with the experts at Granth Dream Homes, I felt confident in my decision. Their attention to detail and commitment to quality is unmatched",
    rating: 5,
  },
  {
    name: "Pooja Nair",
    content:
      "From the very first consultation to the final purchase, Granth Dream Homes provided exceptional service. They truly understand what homebuyers need and deliver beyond expectations",
    rating: 4,
  },
  {
    name: "MIKE MIKE",
    content:
      "Ultimate admiration! I wanted to know more about the real estate business in Dubai. God sent me a unique intelligent young lady Yulia Kravchenko, who has undoubtedly the utmost competence in this skill. Very content with an experienced presentation of the topic. Me and my wife are very happy.",
    rating: 5,
  },
  {
    name: "GIUSEPPE IORIO",
    content:
      "Nadia is the person to talk with. She loves her job and is really prepared for any question you may have. Love makes business with her and hopefully we will make so many more.",
    rating: 5,
  },
];

const ReviewSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time between each slide in ms (e.g., 3 seconds)
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="relative w-full bg-white  dark:bg-[var(--secondary-color)] font-['PT_Serif'] dark:text-white  text-[var(--secondary-color)]  py-16 px-6 lg:px-28 font-raleway">
      <h2 className="text-3xl md:text-4xl font-light mb-6 text-black dark:text-gray-100 text-center">
        Testimonials To Build Your Trust
      </h2>

      <Slider {...settings} className="cursor-grab">
        {reviews.map((review, index) => (
          <div key={index} className="px-3">
            <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/10 dark:border-gray-800 p-6 shadow-lg h-full transition duration-300 hover:shadow-2xl">
              <FaQuoteLeft className="absolute top-4 left-4 text-[var(--primary-color)] text-2xl" />

              <div className="mb-4 mt-6">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {expanded === index
                    ? review.content
                    : `${review.content.slice(0, 140)}...`}
                </p>
              </div>

              <button
                onClick={() =>
                  setExpanded((prev) => (prev === index ? null : index))
                }
                className="text-sm text-[var(--primary-color)] hover:underline"
              >
                {expanded === index ? "SEE LESS" : "READ MORE"}
              </button>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-white">
                    {review.name}
                  </h3>
                  <div className="flex mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-[var(--primary-color)] text-sm mr-1"
                      />
                    ))}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold uppercase">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ReviewSection;
