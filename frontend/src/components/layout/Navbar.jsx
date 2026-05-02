import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, User, PlusSquare, LogOut, LayoutGrid, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const Navbar = ({ openCreateModal }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const targetPath = path.replace(/\/$/, "");
    return currentPath === targetPath;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-2xl h-16 sm:h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-white ">
                YOUR
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent pl-3">
                  POST
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                Community
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-2 py-1.5 backdrop-blur-md">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive("/dashboard")
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,0,122,0.3)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <Home size={18} /> <span>Feed</span>
            </Link>

            <Link
              to="/my-posts"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive("/my-posts")
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(255,0,122,0.3)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <User size={18} /> <span>My Posts</span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCreateModal}
              className="hidden md:flex btn-neon !px-5 !py-2.5 items-center gap-2 text-xs font-bold uppercase"
            >
              <PlusSquare size={18} />
              <span>Create Post</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-red-500 transition-all"
            >
              <LogOut size={18} className="sm:w-[20px]" />
            </button>
          </div>
        </div>
      </nav>

      {/*MOBILE BOTTOM NAV*/}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[80%] z-50">
        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex justify-between items-center px-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Dashboard Icon */}
          <Link
            to="/dashboard"
            className={`p-3 rounded-2xl transition-all ${
              isActive("/dashboard")
                ? "text-pink-400 bg-primary shadow-[inset_0_0_10px_rgba(255,0,122,0.1)]"
                : "text-text-muted"
            }`}
          >
            <Home size={24} />
          </Link>

          {/* Floating Create Button */}
          <div className="relative -top-8">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-40 animate-pulse"></div>
            <button
              onClick={openCreateModal}
              className="relative w-16 h-16 bg-gradient-to-tr from-primary to-pink-700 rounded-full flex items-center justify-center text-white shadow-2xl border-[6px] border-black active:scale-90 transition-transform"
            >
              <Plus size={32} strokeWidth={3} />
            </button>
          </div>

          {/* My Posts Icon */}
          <Link
            to="/my-posts"
            className={`p-3 rounded-2xl transition-all ${
              isActive("/my-posts")
                ? "text-pink-400 bg-primary shadow-[inset_0_0_10px_rgba(255,0,122,0.1)]"
                : "text-text-muted"
            }`}
          >
            <LayoutGrid size={24} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
