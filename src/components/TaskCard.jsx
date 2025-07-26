import { useState } from "react";
import EditTaskModal from "./TaskModal";

export default function TaskCard({ task, onUpdate }) {
  const [done, setDone] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div
        className={`p-4 rounded-lg shadow-md mb-4 flex items-center justify-between cursor-pointer transition ${
          done ? "bg-green-100 dark:bg-green-800 line-through text-gray-500" : "bg-white dark:bg-gray-700"
        }`}
        onClick={() => setEditing(true)}
      >
        <div>
          <p className="text-lg font-medium">{task.title}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {task.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
              >
                {tag}
              </span>
            ))}
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === "high"
                ? "bg-red-200 text-red-800"
                : task.priority === "medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDone(!done);
          }}
          className={`ml-4 px-3 py-1 rounded-lg border ${
            done ? "border-green-600 text-green-600" : "border-gray-400 text-gray-600"
          } hover:bg-green-100 dark:hover:bg-green-900 transition`}
        >
          {done ? "Done" : "Mark Done"}
        </button>
      </div>

      {editing && (
        <EditTaskModal
          task={task}
          onClose={() => setEditing(false)}
          onSave={(updatedTask) => {
            onUpdate(updatedTask);
            setEditing(false);
          }}
        />
      )}
    </>
  );
}
