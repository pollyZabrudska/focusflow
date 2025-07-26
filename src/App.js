import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import TaskBoard from "./pages/TaskBoard";
import IntentionPage from "./pages/IntentionPage";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-900 dark:text-gray-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

<nav
  className={`${
    menuOpen ? "flex" : "hidden"
  } flex-col md:flex md:flex-row md:space-x-4 absolute md:static top-16 left-0 w-full z-50 bg-green-50 dark:bg-gray-900 md:bg-transparent p-4 md:p-0 transition-all duration-300`}
>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline text-green-700 dark:text-green-300 mb-2 md:mb-0"
                  : "hover:underline mb-2 md:mb-0"
              }
            >
              Welcome
            </NavLink>
            <NavLink
              to="/tasks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline text-green-700 dark:text-green-300 mb-2 md:mb-0"
                  : "hover:underline mb-2 md:mb-0"
              }
            >
              Tasks
            </NavLink>
            <NavLink
              to="/intention"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline text-green-700 dark:text-green-300 mb-2 md:mb-0"
                  : "hover:underline mb-2 md:mb-0"
              }
            >
              Intention
            </NavLink>
          </nav>

          <div className="ml-auto">
            <DarkModeToggle />
          </div>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/intention" element={<IntentionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
