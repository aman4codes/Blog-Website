import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-royal flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-panel backdrop-blur-xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black text-gradient mb-2">BlogSphere</h1>
            <p className="text-muted-royal text-sm font-medium tracking-wide">Welcome back. Sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-2xl">
                ⚠️ {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-royal">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="input-modern"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-royal">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="input-modern"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-4 rounded-2xl font-black text-base mt-2 flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {loading
                ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>)
                : "Enter The Sphere"}
            </button>

            <div className="text-center border-t border-white/5 pt-5">
              <p className="text-sm text-muted-royal">
                New here?{" "}
                <Link to="/signup" className="text-amber-200 font-bold hover:text-amber-100 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
