import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/navbar";
import { categories } from "../utils/categories";

function Createblog({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    isPublic: true,
  });

  const allowedCategories = categories.filter((category) => category !== "All");

  useEffect(() => {
    if (!isEdit || !id) return;
    const fetch = async () => {
      try {
        const { data } = await api.get("/blog/userBlog");
        const blog = data.blogs.find((b) => b.id === Number(id));
        if (blog) setFormData({ title: blog.title, content: blog.content, category: blog.category, isPublic: blog.isPublic });
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) await api.put(`/blog/updateBlog/${id}`, formData);
      else await api.post("/blog/createBlog", formData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Save failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-royal flex flex-col">
      <Navbar />

      <main className="flex-1 flex gap-5 px-6 py-5 overflow-hidden" style={{ height: "calc(100vh - 130px)" }}>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 flex flex-col gap-4">
          <div className="flex-1 rounded-3xl border border-white/10 bg-panel p-6 flex flex-col gap-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-royal border-b border-white/5 pb-4">
              Writing Tips
            </h2>

            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-white/80 border border-white/80 hover:border-amber-300/30 transition-all">
                <span className="text-2xl mb-3 block">💡</span>
                <h4 className="font-black text-main mb-1">Captivating Titles</h4>
                <p className="text-xs text-muted-royal leading-relaxed">Spark curiosity without being clickbait. Short, punchy titles tend to perform best.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-white/80 hover:border-amber-300/30 transition-all">
                <span className="text-2xl mb-3 block">📖</span>
                <h4 className="font-black text-main mb-1">Strong Opening</h4>
                <p className="text-xs text-muted-royal leading-relaxed">Hook the reader in the first two sentences. Don't bury the lead.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-white/80 hover:border-amber-300/30 transition-all">
                <span className="text-2xl mb-3 block">✍️</span>
                <h4 className="font-black text-main mb-1">Clear Structure</h4>
                <p className="text-xs text-muted-royal leading-relaxed">Break content into readable chunks. Paragraphs should be 3-4 sentences max.</p>
              </div>
            </div>

            <div className="mt-auto p-3 rounded-xl border border-dashed border-white/10 text-center">
              <p className="text-[10px] font-bold text-muted-royal uppercase tracking-widest">
                Draft saved at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </aside>

        {/* Main form area */}
        <section className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-panel overflow-hidden">
          <div className="px-8 pt-8 pb-4 border-b border-white/5">
            <h1 className="text-4xl font-black text-gradient">{isEdit ? "Edit Post" : "Compose"}</h1>
            <p className="text-muted-royal text-sm mt-1">
              {isEdit ? "Refine your story and publish changes." : "Craft something worth reading."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 flex flex-col gap-6">
            {/* Title + Category row */}
            <div className="flex gap-5">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-royal">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter a captivating title..."
                  className="input-modern text-lg font-bold rounded-2xl"
                />
              </div>
              <div className="w-48 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-royal">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-modern font-bold rounded-2xl"
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {allowedCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2 min-h-0">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-royal">The Story</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Let your ideas flow here..."
                className="input-modern rounded-2xl resize-none flex-1 min-h-52 leading-relaxed"
              />
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              {/* Visibility toggle */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 rounded-full bg-white/80 peer-checked:bg-amber-300 transition-all border border-white/10" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all peer-checked:translate-x-5" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-muted-royal group-hover:text-main transition-colors">
                  {formData.isPublic ? "Public Release" : "Private Draft"}
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-muted-royal border border-white/10 hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center gap-2"
                >
                  {loading
                    ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>)
                    : isEdit ? "Publish Changes" : "Launch Story"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Createblog;
