import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type Offer = {
  _id: string;
  title: string;
  subtitle?: string;
  bannerImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
};

const OfferPopup: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("popupOfferSeen");
    if (seen === "true") return;

    const timer = setTimeout(() => {
      const fetchOffers = async () => {
        try {
          const res = await axios.get<Offer[]>(`${baseURL}/api/offer/view`);
          if (res.data.length > 0) {
            setOffers(res.data);
            setShow(true);
          }
        } catch (err) {
          console.error("Error fetching offers", err);
        }
      };

      fetchOffers();
    }, 8000); // 8 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("popupOfferSeen", "true");
  };

  if (!show || offers.length === 0) return null;

  const offer = offers[currentIndex];

  return (
    /* 1️⃣  The overlay gets the close handler */
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* 2️⃣  Stop clicks that land on the card itself */}
      <div
        className="relative w-full max-w-md bg-black text-white rounded-2xl border border-[#71ced0] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-black font-light hover:text-[#71ced0] text-3xl leading-none"
        >
          &times;
        </button>

        {/* Optional hero image */}
        {offer.bannerImage && (
          <img
            src={offer.bannerImage}
            alt={offer.title}
            className="rounded-t-2xl w-full max-h-64 object-cover"
            draggable="false"
          />
        )}

        {/* Body */}
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-[#71ced0]">{offer.title}</h2>

          {offer.subtitle && <p className="mt-2 text-sm">{offer.subtitle}</p>}

          {offer.ctaLink && offer.ctaLabel && (
            <a
              href={offer.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-[#71ced0] hover:bg-[#5bb7b8] text-black font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {offer.ctaLabel}
            </a>
          )}
        </div>

        {/* Slide counter */}
        {offers.length > 1 && (
          <div className="absolute bottom-3 right-4 text-xs text-gray-400">
            {currentIndex + 1} / {offers.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferPopup;
