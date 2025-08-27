import { useEffect, useState } from "react";
import logo from "../assets/ILN-logo_c089e4b10fad01a7ab60f4da7afc45c2.png";
import sideImage from "../assets/Heathrow35-1024x652.jpg";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [darkMode] = useState(() => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid email format.");
      setMessageType("error");
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("Phone number must be 10 digits.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          Phone: countryCode + phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to send OTP.");
        setMessageType("error");
      } else {
        setMessage("OTP sent to your email.");
        setMessageType("success");
        setStep(2);
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !password) {
      setMessage("Enter OTP and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Verification failed.");
        setMessageType("error");
      } else {
        setMessage("Signup complete!");
        setMessageType("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setOtp("");
        navigate("/login");
      }
    } catch (err) {
      setMessage("Something went wrong during verification.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${sideImage})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Top-left logo */}
      <a href="/" className="absolute top-5 left-5 z-10" title="Go to homepage">
        <img
          src={logo}
          alt="Logo"
          className="w-28 hover:scale-105 transition-transform duration-200"
        />
      </a>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl w-full px-4 md:px-10 flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left Text Block (optional branding) */}
        <div className="hidden md:flex flex-col w-1/2 pr-8 space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight">
            JOIN THE JOURNEY
          </h1>
          <p className="text-lg text-white/80">
            Create your account and start exploring with us.
          </p>
          <p className="text-sm text-white/70">
            We help travelers and traders reach their destination with ease.
          </p>
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 max-w-md backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Create Your Account" : "Verify OTP & Set Password"}
            </h1>
            <p className="text-sm text-gray-300">
              {step === 1
                ? "Join thousands of traders achieving their goals"
                : "Enter the OTP sent to your email and set your password"}
            </p>
          </div>

          <form
            onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
            className="space-y-6"
          >
            <div className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-4 py-3 bg-white/20 text-white rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+971">+971 (UAE)</option>
                        {/* Add more as needed */}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm mb-1">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      placeholder="Enter OTP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 bg-white/20 text-white placeholder-white/70 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/70 hover:text-white"
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[var(--primary-color)] hover:bg-blue-600 text-white py-3.5 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                loading ? "opacity-80" : ""
              }`}
            >
              {loading ? (
                <>{step === 1 ? "Sending OTP..." : "Verifying..."}</>
              ) : step === 1 ? (
                "Send OTP"
              ) : (
                "Verify & Create Account"
              )}
            </button>

            {message && (
              <div
                className={`p-3 rounded-xl text-center text-sm ${
                  messageType === "success"
                    ? "bg-green-100/10 text-green-300"
                    : "bg-red-100/10 text-red-300"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-xs text-gray-300 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-300 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
