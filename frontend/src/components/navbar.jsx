import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create", path: "/createBlog" },
  ];

  return (
    <div className="w-full px-6 pt-5">
      <nav className="flex items-center justify-between px-8 py-4 rounded-3xl border border-white/10 bg-panel backdrop-blur-lg shadow-xl">
        <div className="flex gap-10 items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-base font-semibold transition-all duration-200 px-2 py-1 rounded-lg
                ${location.pathname === item.path
                  ? "text-main bg-white/80"
                  : "text-muted-royal hover:text-main hover:bg-white/80"}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
            className="text-xs font-semibold uppercase tracking-widest text-muted-royal hover:text-main transition-colors px-3 py-2"
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/80 hover:bg-white transition-all text-sm"
          >
            👤
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
