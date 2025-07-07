import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

const fakeTasks = [
  { id: 1, title: "Meditate for 10 minutes", emoji: "🧘‍♀️", tags: ["mindfulness", "health"] },
  { id: 2, title: "Complete frontend tutorial", emoji: "💻", tags: ["learning", "code"] },
  { id: 3, title: "Drink 2L of water", emoji: "💧", tags: ["habit", "hydration"] },
];

export default function TasksPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl mb-4 font-medium">Today's Tasks</h2>
      {fakeTasks.map(task => <TaskCard key={task.id} task={task} />)}
      <div className="mt-6 text-center">
        <Link
          to="/intention"
          className="text-green-700 underline hover:text-green-900"
        >
          ➤ Go to Intention Tracker
        </Link>
      </div>
    </div>
  );
}
