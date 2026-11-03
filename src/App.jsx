
import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Statistics from "./components/Statistics";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FocusList from "./components/FocusList";

function taskReducer(state, action) {

    switch (action.type) {

        case "ADD_TASK":
            return [...state, action.payload];

        case "TOGGLE_TASK":
            return state.map((task) =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );

        case "DELETE_TASK":
            return state.filter(
                (task) => task.id !== action.payload
            );

        case "UPDATE_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? action.payload
                    : task
            );

        case "ADD_TO_FOCUS":
            return state.map((task) =>
                task.id === action.payload
                    ? { ...task, inFocus: true }
                    : task
            );

        case "REMOVE_FROM_FOCUS":
            return state.map((task) =>
                task.id === action.payload
                    ? { ...task, inFocus: false }
                    : task
            );

        default:
            return state;
    }
}

function App() {

    const [tasks, dispatch] = useReducer(
        taskReducer,
        [],
        () => {
            const savedTasks = localStorage.getItem("taskflow-tasks");

            return savedTasks ? JSON.parse(savedTasks) : [];
        }
    );

    // Aufgaben automatisch speichern
    useEffect(() => {
        localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Aufgaben hinzufügen
    function addTask(newTask) {
        dispatch({
            type: "ADD_TASK",
            payload: newTask
        });
    }

    // Aufgaben als erledigt markieren
    function toggleTask(taskId) {
        dispatch({
            type: "TOGGLE_TASK",
            payload: taskId
        });
    }

    // Aufgaben löschen
    function deleteTask(taskId) {
        dispatch({
            type: "DELETE_TASK",
            payload: taskId
        });
    }

    // Aufgaben bearbeiten
    function updateTask(updatedTask) {
        dispatch({
            type: "UPDATE_TASK",
            payload: updatedTask
        });
    }

    // Aufgaben zur Fokusliste hinzufügen
    function addToFocus(taskId) {
        dispatch({
            type: "ADD_TO_FOCUS",
            payload: taskId
        });
    }

    // Aufgaben aus der Fokusliste entfernen
    function removeFromFocus(taskId) {
        dispatch({
            type: "REMOVE_FROM_FOCUS",
            payload: taskId
        });
    }

    return (
        <div className="app-container">

            <Header />

            <Dashboard />

            <Statistics tasks={tasks} />

            <div className="dashboard-content">

                {/* Spalte 1: Neue Aufgaben */}
                <TaskForm onAddTask={addTask} />

                {/* Spalte 2: Meine Aufgaben */}
                <TaskList
                    tasks={tasks}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                    onUpdateTask={updateTask}
                    onAddToFocus={addToFocus}
                    onRemoveFromFocus={removeFromFocus}
                />

                {/* Spalte 3: Meine Fokusliste */}
                <FocusList
                    tasks={tasks}
                    onRemoveFromFocus={removeFromFocus}
                />

            </div>
        </div>
    );
}

export default App;

