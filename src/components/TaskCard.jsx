const TaskCard = ({ task, onDelete, onEdit }) => {

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="bg-bg-surface border border-border rounded-lg p-6 shadow-md flex flex-col gap-4 relative h-full transition-shadow hover:shadow-lg">

            <div className="flex justify-between items-start gap-4">
                <h3 className="m-0 text-xl font-semibold text-text-primary">{task.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${task.completed ? 'bg-success/20 text-success' : 'bg-[#ffc107]/20 text-[#ffc107]'}`}>
                    {task.completed ? "Completado" : "Pendiente"}
                </span>
            </div>

            <div className="flex-1">
                <p className="m-0 text-text-secondary">
                    {task.description || "Sin descripción"}
                </p>
                <div className="mt-2 text-xs text-text-secondary">
                    Created: {formatDate(task.createdAt)}
                </div>
            </div>

            <div className="flex gap-2 mt-auto">
                <button
                    className="flex-1 bg-primary border-primary text-white hover:bg-primary-hover px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    onClick={() => onEdit(task)}
                >
                    Editar
                </button>
                <button
                    className="px-3 py-1.5 rounded text-sm font-medium text-danger border border-danger hover:bg-danger/10 transition-colors"
                    onClick={() => onDelete(task.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );

};

export default TaskCard;
