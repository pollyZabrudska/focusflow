import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";

const columnsFromStorage = JSON.parse(localStorage.getItem("task-columns")) || {
  todo: { name: "To Do", items: [] },
  inProgress: { name: "In Progress", items: [] },
  done: { name: "Done", items: [] },
};

export default function TaskBoard() {
  const [columns, setColumns] = useState(columnsFromStorage);
  const [modalTask, setModalTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("task-columns", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [moved] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  const handleAddTask = (task) => {
    const updated = {
      ...columns,
      todo: { ...columns.todo, items: [task, ...columns.todo.items] },
    };
    setColumns(updated);
  };

  const handleUpdateTask = (updatedTask) => {
    const newColumns = { ...columns };
    for (const colId in newColumns) {
      newColumns[colId].items = newColumns[colId].items.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    }
    setColumns(newColumns);
  };

  const handleDeleteTask = (taskId) => {
    const newColumns = {};
    for (const colId in columns) {
      newColumns[colId] = {
        ...columns[colId],
        items: columns[colId].items.filter((task) => task.id !== taskId),
      };
    }
    setColumns(newColumns);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <TaskForm onAdd={handleAddTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([colId, col]) => (
            <div
              key={colId}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
            >
              <h2 className="text-lg font-semibold mb-3 dark:text-white">
                {col.name}
              </h2>
              <Droppable droppableId={colId}>
                {(provided, snapshot) => (
<div
  ref={provided.innerRef}
  {...provided.droppableProps}
  className={`min-h-[150px] transition-colors duration-200 p-2 rounded-lg space-y-2 ${
    snapshot.isDraggingOver ? "bg-green-50 dark:bg-green-900" : ""
  }`}
>
                    {col.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
<div
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  className={`p-3 bg-white dark:bg-gray-700 border rounded-lg shadow text-sm text-gray-800 dark:text-white transition-colors duration-200 min-h-[60px] ${
    snapshot.isDragging ? "bg-green-100 dark:bg-green-800" : ""
  }`}
>
                            <div className="flex flex-col">
                              <span className="text-lg">{item.content}</span>
                              <div className="flex gap-2 mt-2 text-xs">
                                {item.tag && (
                                  <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-0.5 rounded-full">
                                    #{item.tag}
                                  </span>
                                )}
                                <span
                                  className={`px-2 py-0.5 rounded-full ${
                                    item.priority === "high"
                                      ? "bg-red-100 text-red-700"
                                      : item.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {item.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {modalTask && (
        <TaskModal
          task={modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
