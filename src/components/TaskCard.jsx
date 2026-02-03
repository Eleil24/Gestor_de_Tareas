export default function TaskCard({ task }) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
            <strong>{task.title}</strong>
            <div>
                Estado: {task.completed ? "✔ Completada" : "⏳ Pendiente"}
            </div>
        </div>
    );
}
