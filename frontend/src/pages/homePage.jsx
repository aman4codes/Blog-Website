import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/navbar";
import CategoryBar from "../components/categoryBar";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/blog/allBlog");
        if (data.success) {
          const publicBlogs = data.blogs.filter((b) => b.isPublic);
          setBlogs(publicBlogs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = activeCategory === "All"
    ? blogs
    : blogs.filter((b) => b.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-royal flex flex-col">
      <Navbar />
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

      {/* Main two-column layout */}
      <main className="flex-1 px-6 py-5 overflow-hidden" style={{ height: "calc(100vh - 130px)" }}>
        <section className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-panel overflow-hidden">
          <div className="px-8 pt-8 pb-4 border-b border-white/5">
            <h1 className="text-4xl font-black text-gradient">Blogs</h1>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 flex flex-col gap-6">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-amber-300/20 border-t-amber-300 rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 opacity-40">
                <span className="text-6xl">🏜️</span>
                <p className="text-lg font-bold text-muted-royal">No stories in this category yet.</p>
              </div>
            ) : (
              filtered.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="group p-6 rounded-2xl border-3 border-amber-200/40 hover:border-amber-400/50 bg-white/90 hover:bg-amber-50 shadow-sm shadow-slate-300/10 transition-all cursor-pointer card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 px-3 py-1 rounded-full bg-amber-300/10 border border-amber-300/20">
                      {blog.category || "General"}
                    </span>
                    <span className="text-[10px] font-bold text-muted-royal uppercase tracking-wider">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-main mb-2 group-hover:text-amber-200 transition-colors leading-snug">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-muted-royal line-clamp-2 leading-relaxed mb-4">
                    {blog.content}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-muted-royal"> By {blog.author?.name || "Unknown author"}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/blog/${blog.id}`); }}
                      className="text-xs font-black uppercase tracking-widest text-amber-200 hover:text-main hover:bg-amber-400 px-4 py-2 rounded-lg border border-amber-300/30 transition-all"
                    >
                      Read →
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
