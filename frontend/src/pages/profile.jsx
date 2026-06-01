import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../api/axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/me");
        if (data.success) {
          setUser(data.user);
        } else {
          setError(data.message || "Unable to load profile.");
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-royal flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-panel p-8 text-main">
          <h1 className="text-4xl font-black text-main">Profile</h1>
          <p className="mt-4 text-sm text-muted-royal">
            This is your profile area. Your account details and personal settings will appear here.
          </p>
          {loading ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-panel p-6 text-muted-royal">
              Loading profile...
            </div>
          ) : error ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-panel p-6 text-muted-royal">
              <p className="text-sm text-muted-royal">{error}</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-panel p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-royal">Account</p>
                <p className="mt-3 text-lg font-semibold text-main">{user?.name || "Unnamed user"}</p>
                <p className="mt-2 text-sm text-muted-royal">{user?.email || "No email available"}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-panel p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-royal">Quick actions</p>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="mt-4 w-full rounded-2xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-400"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
