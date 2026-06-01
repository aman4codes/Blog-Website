import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/navbar";
import CategoryBar from "../components/categoryBar";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [blogsResponse, profileResponse] = await Promise.all([
          api.get("/blog/userBlog"),
          api.get("/auth/me"),
        ]);

        if (blogsResponse.data.success) {
          setBlogs(blogsResponse.data.blogs);
        }

        if (profileResponse.data.success) {
          setAuthor(
            profileResponse.data.user?.name ||
              profileResponse.data.user?.email ||
              "Creator",
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      const { data } = await api.delete(`/blog/deleteBlog/${id}`);
      if (data.success) setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category?.toLowerCase() === activeCategory.toLowerCase(),
        );

  return (
    <div className="min-h-screen bg-royal flex flex-col">
      <Navbar />
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

      <main
        className="flex-1 flex gap-5 px-6 py-5 overflow-hidden"
        style={{ height: "calc(100vh - 130px)" }}
      >
        {/* Sidebar */}
        <aside className="w-72 shrink-0 flex flex-col gap-4">
          <div className="flex-1 rounded-3xl border border-white/10 bg-panel p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-amber-500 via-rose-500 to-violet-600 flex items-center justify-center text-3xl font-black text-white shadow-xl mb-5">
              #
            </div>
            <h2 className="text-2xl font-black text-main mb-1">{author}</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 px-3 py-1 rounded-full bg-amber-300/10 border border-amber-300/20 mb-6">
              Pro Creator
            </span>

            <div className="w-full flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-center bg-white/80 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-muted-royal uppercase">
                  Total Posts
                </span>
                <span className="text-lg font-black text-main">
                  {blogs.length}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/80 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-muted-royal uppercase">
                  Reach
                </span>
                <span className="text-lg font-black text-main">12.4k</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/createBlog")}
              className="btn-premium w-full py-3 rounded-2xl font-black text-sm"
            >
              + New Story
            </button>
          </div>
        </aside>

        {/* Main posts list */}
        <section className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-panel overflow-hidden">
          <div className="px-8 pt-8 pb-4 border-b border-white/5">
            <h1 className="text-4xl font-black text-gradient">Dashboard</h1>
            <p className="text-muted-royal text-sm mt-1">
              Manage your published stories
            </p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 flex flex-col gap-4">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-amber-300/20 border-t-amber-300 rounded-full animate-spin" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                <span className="text-6xl">📭</span>
                <p className="text-xl font-bold text-muted-royal">
                  Your shelf is empty
                </p>
                <button
                  onClick={() => navigate("/createBlog")}
                  className="btn-premium px-8 py-3 rounded-2xl font-black text-sm"
                >
                  Write First Post
                </button>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                <span className="text-6xl">🔍</span>
                <p className="text-xl font-bold text-muted-royal">
                  No posts match this category.
                </p>
                <p className="text-sm text-muted-royal">
                  Try another category or reset to All.
                </p>
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group flex items-center justify-between gap-6 p-6 rounded-2xl border-5 border-amber-100/40 hover:border-amber-300/30 bg-white/80 hover:bg-amber-50 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-200">
                        {blog.category || "General"}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${blog.isPublic ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${blog.isPublic ? "bg-emerald-400" : "bg-rose-400"}`}
                        />
                        {blog.isPublic ? "Public" : "Draft"}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-main group-hover:text-amber-200 transition-colors truncate">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-muted-royal mt-1">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-amber-200 bg-amber-300/10 border border-amber-300/20 hover:bg-amber-400 hover:text-main transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500 hover:text-main transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
