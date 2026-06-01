import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import api from "../api/axios";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get("/blog/allBlog");
        if (data.success) {
          const foundBlog = data.blogs.find((item) => String(item.id) === String(id));
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError("Blog not found.");
          }
        } else {
          setError("Unable to load blog.");
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen bg-royal flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-panel p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200 hover:text-main"
          >
            ← Back
          </button>

          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <div className="w-10 h-10 border-4 border-amber-300/20 border-t-amber-300 rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="min-h-[40vh] flex items-center justify-center text-center">
              <p className="text-muted-royal">{error}</p>
            </div>
          ) : blog ? (
            <article className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 px-3 py-1 rounded-full bg-amber-300/10 border border-amber-300/20">
                    {blog.category || "General"}
                  </span>
                  <h1 className="mt-5 text-4xl font-black text-main">{blog.title}</h1>
                  <p className="mt-2 text-sm text-muted-royal">
                    By <span className="font-semibold text-main">{blog.author?.name || "Unknown author"}</span> • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/80 px-5 py-4 text-sm text-muted-royal">
                  <p className="uppercase tracking-[0.3em] text-muted-royal">Author</p>
                  <p className="mt-2 text-main font-semibold">{blog.author?.name || "Unknown"}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-panel p-6 text-slate-200 leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default BlogDetails;
