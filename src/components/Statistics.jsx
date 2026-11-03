
function Statistics({ tasks }) {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const openTasks = totalTasks - completedTasks;

    return (
        <section className="statistics-section">
            <h2>Deine Übersicht</h2>

            <div className="statistics-grid">

                <div className="stat-card stat-total">
                    <h3>Alle Aufgaben</h3>
                    <p>{totalTasks}</p>
                </div>

                <div className="stat-card stat-open">
                    <h3>Offene Aufgaben</h3>
                    <p>{openTasks}</p>
                </div>

                <div className="stat-card stat-completed">
                    <h3>Erledigte Aufgaben</h3>
                    <p>{completedTasks}</p>
                </div>

            </div>
        </section>
    );
}

export default Statistics;
