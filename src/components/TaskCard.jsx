const TaskCard = ({ task, onDelete, onEdit }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{task.title}</h3>
                <span className={`badge ${task.completed ? 'success' : 'pending'}`}>
                    {task.completed ? "Completado" : "Pendiente"}
                </span>
            </div>

            <div>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    {task.description || "Sin descripción"}
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Created: {formatDate(task.createdAt)}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button
                    className="primary"
                    style={{ flex: 1, padding: '0.4em 0.8em', fontSize: '0.9rem' }}
                    onClick={() => onEdit(task)}
                >
                    Editar
                </button>
                <button
                    style={{ padding: '0.4em 0.8em', fontSize: '0.9rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
                    onClick={() => onDelete(task.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
