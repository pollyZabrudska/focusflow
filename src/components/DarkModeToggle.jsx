import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600"
      >
        {dark ? "☀ Light mode" : "🌙 Dark mode"}
      </button>
    </div>
  );
}
