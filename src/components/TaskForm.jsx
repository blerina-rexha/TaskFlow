import { useState } from "react";

function TaskForm({ onAddTask }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

    const newTask = {
        id: Date.now(),
        title,
        description,
        category,
        deadline
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setCategory("");
    setDeadline("");

}

    return (
        <section>
            <h2>Neue Aufgabe hinzufügen</h2>

            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Aufgabentitel:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="z. B. E-Mail an Kunden senden"
                        required
                    />
                </div>

                <div>
                    <label>Beschreibung:</label>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Beschreibung der Aufgabe..."
                    ></textarea>
                </div>

                <div>
                    <label>Kategorie:</label>
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                    >
                        <option value="">Kategorie auswählen</option>
                        <option value="Arbeit">Arbeit</option>
                        <option value="Studium">Studium</option>
                        <option value="Privat">Privat</option>
                    </select>
                </div>

                <div>
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(event) => setDeadline(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">Aufgabe hinzufügen</button>
            </form>
        </section>
    );
}

export default TaskForm;