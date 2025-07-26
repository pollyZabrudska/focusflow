import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return setError("Task description is required.");

    const newTask = {
      id: uuid(),
      content: text,
      priority,
      tag,
    };

    onAdd(newTask);
    setText("");
    setPriority("medium");
    setTag("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="py-2 px-4 border rounded-lg dark:bg-gray-800 dark:text-white"
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>

      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag (optional)"
        className="p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
      />

      <button
        type="submit"
        className="bg-[#025c2c] text-white px-4 py-2 rounded-lg hover:bg-[#027937] transition-colors"
      >
        Add
      </button>
    </form>
  );
}
