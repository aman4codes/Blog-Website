import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";
import { Oval } from "react-loader-spinner";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const { data } = await api.post("/auth/signup", form);

      localStorage.setItem("token", data.token);
      console.log(data);
      setMessage(data.message);

      setTimeout(() => {
        navigate("/home");
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setMessage(
        error.response?.data?.message || "SignUp failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen border-2 m-2 border-amber-950">
      <div className="relative w-full max-w-md">
        {loading ? (
            <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-10 rounded">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
            <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 border-2 border-blue-400 rounded"
            >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <div className="text-4xl font-bold border-2 text-center">BlogDot</div>

            {message && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}

            <input
              type="name"
              name="name"
              placeholder="Enter your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Logging in..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
