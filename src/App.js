import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import TasksPage from "./pages/TasksPage";
import IntentionPage from "./pages/IntentionPage";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* 👇 Хедер з навігацією та темою */}
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">
              Welcome
            </Link>
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
            <Link to="/intention" className="hover:underline">
              Intention
            </Link>
          </nav>
          <DarkModeToggle />
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/intention" element={<IntentionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
