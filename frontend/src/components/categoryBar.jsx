import { categories } from "../utils/categories";

function CategoryBar({ active = "All", onSelect }) {
  return (
    <div className="w-full px-6 pt-3">
      <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-panel backdrop-blur-md overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect?.(cat)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200
              ${active === cat
                ? "bg-amber-300/30 text-main border border-amber-300/50 shadow-sm shadow-amber-300/20"
                : "text-muted-royal hover:text-main hover:bg-white/10"}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
