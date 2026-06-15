import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedIn, removeUserInfo, getUserInfo } from "../../services/auth.service";
import ThemeToggle from "../theme/theme_toggle.component";
import { ArrowRight, Menu, Sparkles, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useTheme } from "../theme/theme.context";

const NavListComponent = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const { pathname } = useLocation();
  const { glowEnabled, toggleGlow } = useTheme();

  // Listen to auth state changes dynamically
  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(isLoggedIn());
      setUserInfo(getUserInfo());
    };

    window.addEventListener("story-spark-auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("story-spark-auth-change", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    removeUserInfo();
    setLoggedIn(false);
    setUserInfo(null);
    navigate("/");
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path || (path === "/" && pathname === "/");
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/story-inspiration", label: "Stories" },
    { to: "/community", label: "Community" },
  ];

  const getProfileInitial = () => {
    if (userInfo && userInfo.name) {
      return userInfo.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Variants for Framer Motion animations
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      y: -10, 
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Background Blur & Border Effects */}
      <div className="absolute inset-0 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 dark:bg-slate-950/70 dark:shadow-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent dark:via-indigo-500/30" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Side: Brand logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link
            to="/"
            className="group flex items-center gap-3 transition-all duration-300"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
              handleNavClick();
            }}
          >
            {/* Spark Icon Container with glowing background */}
            <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-indigo-200/50 bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/35 dark:border-white/10 dark:shadow-indigo-950/40">
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Sparkles className="relative h-5 w-5 animate-pulse" />
            </div>

            <div className="leading-tight">
              <span className="block text-base font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                Story Spark
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                AI Studio
              </span>
            </div>
            <div className="hidden rounded-full border border-indigo-100 bg-indigo-50/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 md:block">
              Beta
            </div>
          </Link>
        </motion.div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden items-center rounded-full border border-slate-200/60 bg-slate-50/50 p-1 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/40 lg:flex">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={handleNavClick}
                className={`relative flex h-9 items-center rounded-full px-4 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(item.to)
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white"
                }`}
              >
                {isActive(item.to) && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/20 dark:shadow-indigo-900/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            </motion.div>
          ))}

          {loggedIn && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
              className="relative"
            >
              <NavLink
                to="/dashboard"
                onClick={handleNavClick}
                className={`relative flex h-9 items-center rounded-full px-4 text-xs font-semibold tracking-wide transition-colors duration-300 ${
                  isActive("/dashboard")
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-350 dark:hover:text-white"
                }`}
              >
                {isActive("/dashboard") && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/20 dark:shadow-indigo-900/40"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </span>
              </NavLink>
            </motion.div>
          )}
        </nav>

        {/* Right Side: Actions (Desktop/Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cursor Glow Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleGlow}
            className={`group relative grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 ${
              glowEnabled
                ? "border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400"
                : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-slate-300"
            }`}
            title={glowEnabled ? "Cursor Glow: Enabled" : "Cursor Glow: Disabled"}
            aria-label={glowEnabled ? "Disable cursor glow" : "Enable cursor glow"}
            aria-pressed={glowEnabled}
          >
            <Sparkles className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-12 ${glowEnabled ? "scale-110" : ""}`} />
            {glowEnabled && (
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
            )}
          </motion.button>

          {/* Theme Switcher Wrapper */}
          <div className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <ThemeToggle />
          </div>

          {/* Authentication Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {loggedIn ? (
              <div className="flex items-center gap-3 pl-1">
                {/* User avatar/initial circle */}
                <Link
                  to="/dashboard/profile"
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/20"
                  title="View Profile"
                >
                  {userInfo?.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.name || "User"}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold tracking-wide">{getProfileInitial()}</span>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                </Link>

                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-350 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-1">
                <Link
                  to="/login"
                  className="flex h-9 items-center rounded-full border border-transparent px-4 text-xs font-semibold text-slate-700 transition-colors duration-300 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  Login
                </Link>

                <motion.div
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to="/signup"
                    className="group flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-4 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/35"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-950/95 lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-5 pt-2 sm:px-6">
              <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-2 shadow-inner dark:border-slate-900 dark:bg-slate-900/20">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={mobileItemVariants}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={handleNavClick}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        isActive(item.to)
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive(item.to) && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </NavLink>
                  </motion.div>
                ))}

                {loggedIn && (
                  <motion.div
                    custom={navItems.length}
                    initial="hidden"
                    animate="visible"
                    variants={mobileItemVariants}
                  >
                    <NavLink
                      to="/dashboard"
                      onClick={handleNavClick}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                        isActive("/dashboard")
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </span>
                      {isActive("/dashboard") && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </NavLink>
                  </motion.div>
                )}

                <motion.div
                  custom={navItems.length + 1}
                  initial="hidden"
                  animate="visible"
                  variants={mobileItemVariants}
                  className="grid gap-2 border-t border-slate-200/60 pt-2 dark:border-slate-800"
                >
                  {loggedIn ? (
                    <div className="space-y-2">
                      <Link
                        to="/dashboard/profile"
                        onClick={handleNavClick}
                        className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 text-white">
                          {userInfo?.avatar ? (
                            <img
                              src={userInfo.avatar}
                              alt={userInfo.name || "User"}
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold">{getProfileInitial()}</span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-0.5">
                            {userInfo?.name || "Profile"}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {userInfo?.email}
                          </span>
                        </div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/60 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <Link
                        to="/login"
                        onClick={handleNavClick}
                        className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:bg-slate-850"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={handleNavClick}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-300"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavListComponent;
