import { useState, useEffect } from "react";

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const [content, setContent] = useState(task.content);
  const [tag, setTag] = useState(task.tag || "");
  const [priority, setPriority] = useState(task.priority || "low");

  useEffect(() => {
    setContent(task.content);
    setTag(task.tag || "");
    setPriority(task.priority || "low");
  }, [task]);

  const handleSave = () => {
    onSave({ ...task, content, tag, priority });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</h2>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Task content"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => { onDelete(task.id); onClose(); }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => { handleSave(); onClose(); }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
