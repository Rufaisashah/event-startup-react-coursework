import { Link, Outlet, NavLink } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./Layout.css";

export default function Layout() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Dark navbar */}
      <header className="bg-gray-900 sticky top-0 z-50 shadow-lg">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
          {/* Logo */}

          <a
            href="https://www.hackyourfuture.dk/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center shrink-0"
          >
            <img src={hyfLogo} alt="HackYourFuture logo" width={90} />
          </a>

          {/* Nav links */}
          <ul className="flex items-center gap-1 flex-1 list-none m-0 p-0">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white"
                    : "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white"
                    : "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                }
              >
                Events
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-white"
                      : "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right side — cart + auth */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart icon */}
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-indigo-500 text-white 
                               text-xs font-bold w-5 h-5 rounded-full flex 
                               items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <span className="text-gray-400 text-sm hidden md:block">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-white/10 hover:bg-white/20 text-white 
                             px-4 py-2 rounded-lg text-sm font-medium
                             transition-all duration-200"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:text-white text-sm 
                             font-medium transition-colors px-3 py-2"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white text-gray-900 hover:bg-gray-100
                             px-4 py-2 rounded-lg text-sm font-semibold
                             transition-all duration-200"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>
          2026 HYF Events ·{" "}
          <Link
            to="/events"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Browse events
          </Link>
        </p>
      </footer>
    </div>
  );
}
