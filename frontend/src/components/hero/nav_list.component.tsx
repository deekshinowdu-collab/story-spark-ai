import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";
import ThemeToggle from "../theme/theme_toggle.component";

const NavListComponent = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = () => {
    removeUserInfo();
    setLoggedIn(false);
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "text-white bg-slate-800/70"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0B1120]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-lg font-bold text-slate-800 dark:text-white"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          Spark-Story-AI
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/explore" className={linkClass}>
            Explore
          </NavLink>
          <NavLink to="/story-inspiration" className={linkClass}>
            Stories
          </NavLink>
          <NavLink to="/community" className={linkClass}>
            Community
          </NavLink>
          {loggedIn && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {loggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 dark:text-slate-400 transition-all duration-300 hover:bg-slate-200/60 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white lg:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200/70 dark:border-white/10 bg-white dark:bg-[#0B1120]/95 px-4 py-3">
          <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/explore" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Explore
          </NavLink>
          <NavLink to="/story-inspiration" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Stories
          </NavLink>
          <NavLink to="/community" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            Community
          </NavLink>
          {loggedIn && (
            <NavLink to="/dashboard" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default NavListComponent;