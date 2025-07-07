import { useState } from "react";

export default function TaskCard({ task }) {
  const [done, setDone] = useState(false);

  return (
    <div
      className={`p-4 rounded-lg shadow-md max-w-md mx-auto mb-4 flex items-center justify-between 
        ${done ? "bg-green-100 dark:bg-green-800 line-through text-gray-500" : "bg-white dark:bg-gray-700"}
      `}
    >
      <div>
        <p className="text-lg font-medium">{task.emoji} {task.title}</p>
        <div className="flex gap-2 mt-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setDone(!done)}
        className={`ml-4 px-3 py-1 rounded-lg border ${
          done ? "border-green-600 text-green-600" : "border-gray-400 text-gray-600"
        } hover:bg-green-100 dark:hover:bg-green-900 transition`}
      >
        {done ? "Done" : "Mark Done"}
      </button>
    </div>
  );
}
