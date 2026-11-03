
import { useState } from "react";

function TaskList({
    tasks,
    onToggleTask,
    onDeleteTask,
    onUpdateTask,
    onAddToFocus,
    onRemoveFromFocus
}) {

    // 1. STATES

    const [editingTaskId, setEditingTaskId] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDeadline, setEditDeadline] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Alle");


    // 2. AUFGABEN SORTIEREN UND FILTERN

    // Aufgaben sortieren: Offene Aufgaben zuerst,
// innerhalb der Gruppen nach Deadline

    const sortedTasks = [...tasks].sort((a, b) => {

    const aCompleted = Boolean(a.completed);
    const bCompleted = Boolean(b.completed);

    if (aCompleted !== bCompleted) {
        return aCompleted ? 1 : -1;
    }

    return a.deadline.localeCompare(b.deadline);
    });

    // Aufgaben anhand des Titels suchen
    const filteredTasks = sortedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Aufgaben nach Kategorie filtern
    const categoryFilteredTasks = filteredTasks.filter((task) =>
        selectedCategory === "Alle" || task.category === selectedCategory
    );

    // Aufgaben auswählen, die sich in der Fokusliste befinden
    // Fokusaufgaben aus der bereits sortierten Aufgabenliste auswählen
    const focusTasks = sortedTasks.filter((task) => task.inFocus);


    // 3. DEADLINE-FUNKTIONEN

    function getDeadlineStatus(deadline) {

        const [year, month, day] = deadline.split("-").map(Number);

        const dueDate = new Date(year, month - 1, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const differenceInTime = dueDate.getTime() - today.getTime();

        const daysRemaining = Math.round(
            differenceInTime / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining < 0) {
            return "Überfällig";
        }

        if (daysRemaining === 0) {
            return "Heute fällig";
        }

        if (daysRemaining === 1) {
            return "Noch 1 Tag";
        }

        if (daysRemaining <= 2) {
            return "Noch 2 Tage";
        }

        return `Noch ${daysRemaining} Tage`;
    }


    function getDeadlineClass(deadline) {

        const status = getDeadlineStatus(deadline);

        if (status === "Überfällig") {
            return "deadline-overdue";
        }

        if (status === "Heute fällig") {
            return "deadline-today";
        }

        if (status === "Noch 1 Tag" || status === "Noch 2 Tage") {
            return "deadline-soon";
        }

        return "deadline-later";
    }


    // 4. AUFGABEN BEARBEITEN UND SPEICHERN

    function handleEdit(task) {

        setEditingTaskId(task.id);

        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditCategory(task.category);
        setEditDeadline(task.deadline);
    }


    function handleSave(task) {

        const updatedTask = {
            ...task,
            title: editTitle,
            description: editDescription,
            category: editCategory,
            deadline: editDeadline
        };

        onUpdateTask(updatedTask);

        setEditingTaskId(null);
    }


    // 5. DARSTELLUNG

    return (
        <section>

            <h2>Meine Aufgaben</h2>

            {/* Suchfeld und Kategorie-Filter */}

            <div className="task-filters">

                <input
                    type="text"
                    className="task-search"
                    placeholder="Aufgabe suchen..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                    className="category-filter"
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                >
                    <option value="Alle">Alle Kategorien</option>
                    <option value="Arbeit">Arbeit</option>
                    <option value="Studium">Studium</option>
                    <option value="Privat">Privat</option>
                </select>

            </div>

            {/* Aufgabenliste */}

            {categoryFilteredTasks.map((task) => (

                <div key={task.id} className="task-card">

                    {/* Bearbeitungsmodus */}

                    {editingTaskId === task.id ? (

                        <div>

                            <input
                                type="text"
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                            />

                            <textarea
                                value={editDescription}
                                onChange={(event) => setEditDescription(event.target.value)}
                            />

                            <select
                                value={editCategory}
                                onChange={(event) => setEditCategory(event.target.value)}
                            >
                                <option value="Arbeit">Arbeit</option>
                                <option value="Studium">Studium</option>
                                <option value="Privat">Privat</option>
                            </select>

                            <input
                                type="date"
                                value={editDeadline}
                                onChange={(event) => setEditDeadline(event.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => handleSave(task)}
                            >
                                Speichern
                            </button>

                        </div>

                    ) : (

                        /* Normale Aufgabenanzeige */

                        <div>

                            <h3 className={task.completed ? "completed" : ""}>
                                {task.title}
                            </h3>

                            <p>{task.description}</p>

                            <p>Kategorie: {task.category}</p>

                            <p>Deadline: {task.deadline}</p>

                            <p className={
                                task.completed
                                    ? "deadline-completed"
                                    : getDeadlineClass(task.deadline)
                            }>
                                {!task.completed
                                    ? getDeadlineStatus(task.deadline)
                                    : "Erledigt"}
                            </p>

                        </div>
                    )}


                    {/* Aufgabe als erledigt markieren */}

                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed || false}
                            onChange={() => onToggleTask(task.id)}
                        />
                        Erledigt
                    </label>


                    {/* Zur Fokusliste hinzufügen oder entfernen */}

                    {task.inFocus ? (

                        <button
                            type="button"
                            className="focus-remove-button"
                            onClick={() => onRemoveFromFocus(task.id)}
                        >
                            Aus Fokusliste entfernen
                        </button>

                    ) : (

                        <button
                            type="button"
                            className="focus-button"
                            onClick={() => onAddToFocus(task.id)}
                        >
                            + Zur Fokusliste hinzufügen
                        </button>

                    )}


                    {/* Aufgabe bearbeiten */}

                    <button
                        type="button"
                        onClick={() => handleEdit(task)}
                    >
                        Bearbeiten
                    </button>


                    {/* Aufgabe löschen */}

                    <button
                        type="button"
                        className="delete-button"
                        onClick={() => onDeleteTask(task.id)}
                    >
                        Löschen
                    </button>

                </div>

            ))}

        </section>
    );
}

export default TaskList;
