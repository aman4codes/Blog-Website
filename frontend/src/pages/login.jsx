import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      // Store token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Invalid credentials",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80svh] py-12 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border border-(--border) shadow-(--shadow) bg-(--bg) transition-all duration-300">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-(--text-h) tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-3 text-(--text)">
            Log in to your account to continue blogging.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-(--text-h) ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border border-(--border) bg-(--bg) text-(--text-h) focus:border-(--accent) focus:ring-2 focus:ring-(--accent) focus:ring-opacity-10 outline-none transition-all placeholder:text-(--text)/40"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-(--text-h) ml-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border border-(--border) bg-(--bg) text-(--text-h) focus:border-(--accent) focus:ring-2 focus:ring-(--accent) focus:ring-opacity-10 outline-none transition-all placeholder:text-(--text)/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 px-6 bg-(--accent) text-white font-bold rounded-2xl shadow-xl shadow-(--accent)/20 hover:opacity-90 transform transition-all active:scale-[0.98] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span
              className={
                loading ? "opacity-0" : "opacity-100 transition-opacity"
              }
            >
              {loading ? "Logging in..." : "Log In"}
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-(--border) text-center">
          <p className="text-(--text)">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-(--accent) font-bold hover:underline underline-offset-4"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
