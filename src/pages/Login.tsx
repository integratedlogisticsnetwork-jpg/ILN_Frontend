import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/ILN-logo_c089e4b10fad01a7ab60f4da7afc45c2.png";
import sideImage from "../assets/Heathrow35-1024x652.jpg";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/members/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Login failed.");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/directory");
        window.location.reload();
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${sideImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <a href="/" className="absolute top-5 left-5 z-10" title="Go to homepage">
        <img
          src={logo}
          alt="Logo"
          className="w-28 hover:scale-105 transition-transform duration-200"
        />
      </a>

      <div className="relative z-10 max-w-6xl w-full px-4 md:px-10 flex flex-col md:flex-row items-center justify-between text-white">
        <div className="hidden md:flex flex-col w-1/2 pr-8 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            EXPLORE <br /> HORIZONS
          </h1>
          <p className="text-lg text-white/80">
            Where Your Dream Destinations <br />
            Become Reality.
          </p>
          <p className="text-sm text-white/70">
            Embark on a journey where every corner <br />
            of the world is within your reach.
          </p>
        </div>

        <div className="w-full md:w-1/2 max-w-md backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-3xl font-semibold mb-2 text-white">
            Welcome Back
          </h2>
          <p className="text-sm mb-6 text-gray-300">Log in to your account</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right text-sm text-white/70">
              <a
                href="/forgot-password"
                className="hover:underline text-blue-300"
              >
                Forgot/Change password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-color)] hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>

            {message && (
              <p className="text-sm text-center text-red-400">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
