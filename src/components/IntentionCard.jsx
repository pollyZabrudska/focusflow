import { useState, useEffect } from "react";

export default function IntentionCard() {
  const [intention, setIntention] = useState("");
  const [note, setNote] = useState("");
  const [savedIntentions, setSavedIntentions] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("intentions");
    if (saved) {
      setSavedIntentions(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (intentions) => {
    localStorage.setItem("intentions", JSON.stringify(intentions));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intention.trim()) return alert("Please enter your intention");

    if (editId) {
      // 🔁 Update existing intention
      const updated = savedIntentions.map((item) =>
        item.id === editId ? { ...item, intention, note } : item
      );
      setSavedIntentions(updated);
      saveToLocalStorage(updated);
      setEditId(null);
    } else {
      const newEntry = {
        id: Date.now(),
        intention,
        note,
        date: new Date().toLocaleDateString(),
      };
      const updatedIntentions = [newEntry, ...savedIntentions];
      setSavedIntentions(updatedIntentions);
      saveToLocalStorage(updatedIntentions);
    }

    setIntention("");
    setNote("");
  };

  const handleEdit = (id) => {
    const entry = savedIntentions.find((item) => item.id === id);
    if (entry) {
      setIntention(entry.intention);
      setNote(entry.note || "");
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const updated = savedIntentions.filter((item) => item.id !== id);
    setSavedIntentions(updated);
    saveToLocalStorage(updated);
    if (editId === id) {
      setEditId(null);
      setIntention("");
      setNote("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-xl text-gray-800 capitalize">
          {editId ? "Edit intention" : "Set your intention"}
        </h2>

        <input
          type="text"
          placeholder="My intention today is..."
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-sm"
        />

        <textarea
          placeholder="Optional: add a note or reason"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 text-sm resize-none"
          rows={3}
        />

        <button
          type="submit"
          className="bg-[#025c2c] hover:bg-[#027937] text-white py-2 px-5 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          {editId ? "Update intention" : "Save intention"}
        </button>
      </form>

      {savedIntentions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-normal text-gray-800 mb-3 capitalize">
            Saved intentions
          </h3>
          <ul className="space-y-2 max-h-52 overflow-y-auto">
            {savedIntentions.map(({ id, intention, note, date }) => (
              <li
                key={id}
                className="p-3 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm relative"
              >
                <p>{intention}</p>
                {note && <p className="mt-1 text-gray-600">{note}</p>}
                <p className="mt-2 text-xs text-gray-500">{date}</p>

                <div className="flex gap-4 absolute top-2 right-4">
                  <button
                    onClick={() => handleEdit(id)}
                    className="text-green-700 text-xs hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
