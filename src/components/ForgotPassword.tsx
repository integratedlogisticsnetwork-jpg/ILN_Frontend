import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ForgotPassword() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/api/members/forgot-password`, {
        email,
      });
      setMessage(res.data.message);
      setStep(2); // move to OTP step
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${baseURL}/api/members/verify-otp`, {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);

      // Optionally show success briefly, then redirect
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--primary-color)] dark:text-white">
          {step === 1 ? "Forgot Password" : "Verify OTP"}
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm text-red-600 dark:text-red-400">
            {message}
          </p>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
