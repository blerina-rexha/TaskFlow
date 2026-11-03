
function FocusList({ tasks, onRemoveFromFocus }) {

    // Aufgaben aus der Fokusliste auswählen
    const focusTasks = [...tasks]
        .filter((task) => task.inFocus)
        .sort((a, b) => {

            // Erledigte Aufgaben nach unten sortieren
            if (Boolean(a.completed) !== Boolean(b.completed)) {
                return a.completed ? 1 : -1;
            }

            // Nach Deadline sortieren
            return a.deadline.localeCompare(b.deadline);
        });

    return (
        <section className="focus-list">

            <h2>Meine Fokusliste ({focusTasks.length})</h2>

            {focusTasks.length === 0 ? (

                <p>Du hast noch keine Aufgaben ausgewählt.</p>

            ) : (

                focusTasks.map((task) => (

                    <div key={task.id} className="focus-task-card">

                        <h3 className={task.completed ? "completed" : ""}>
                            {task.title}
                        </h3>

                        <p>Kategorie: {task.category}</p>

                        <p>Deadline: {task.deadline}</p>

                        {task.completed && <p>Erledigt</p>}

                        <button
                            type="button"
                            className="focus-remove-button"
                            onClick={() => onRemoveFromFocus(task.id)}
                        >
                            Aus Fokusliste entfernen
                        </button>

                    </div>
                ))

            )}

        </section>
    );
}

export default FocusList;
