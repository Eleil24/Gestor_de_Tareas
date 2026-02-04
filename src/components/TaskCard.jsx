import { useState } from "react";
import { formatDate } from "../utils/dateFormatter";

export default function TaskCard({ task, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);

    const handleSave = () => {
        onUpdate(task.id, {
            title,
            description,
            completed
        });
        setIsEditing(false);
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
            {isEditing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                        Completada
                    </label>

                    <div>
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <p>
                        <strong>Creado:</strong> {formatDate(task.createdAt)}
                    </p>
                    <div>
                        <strong>Estado:</strong> {task.completed ? "✔ Completada" : "⏳ Pendiente"}
                    </div>

                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={() => onDelete(task.id)}>Eliminar</button>
                </>
            )}
        </div>
    );
}

