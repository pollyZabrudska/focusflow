import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen() {
  const [intention, setIntention] = useState("");
  const [submittedIntention, setSubmittedIntention] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intention.trim()) return;

    setSubmittedIntention(intention.trim());
    localStorage.setItem("todayIntention", intention.trim());
    setIntention("");
  };

  const handleEdit = () => {
    setIntention(submittedIntention);
    setSubmittedIntention(null);
  };

  useEffect(() => {
    const saved = localStorage.getItem("todayIntention");
    if (saved) {
      setSubmittedIntention(saved);
    }
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-normal mb-4 text-gray-800 dark:text-gray-100">
        Good morning, beautiful soul. What is your main intention for today?
      </h1>

      {/* ❗️Показуємо форму тільки якщо намір ще не підтверджено */}
      {!submittedIntention && (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Whatever feels the most important today..."
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-[#025c2c] text-white px-4 rounded-lg hover:bg-[#027937] transition-colors"
          >
            Next
          </button>
        </form>
      )}

      {/* 👇 Якщо є підтверджений намір — показуємо */}
      {submittedIntention && (
        <div className="mt-6 text-lg text-center text-gray-800 dark:text-gray-100">
          <p className="italic">✨ Today’s intention:</p>
          <p className="font-medium mt-1 mb-3">"{submittedIntention}"</p>
          <button
            onClick={handleEdit}
            className="text-sm text-green-700 hover:underline dark:text-green-400"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
