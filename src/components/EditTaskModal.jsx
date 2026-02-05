import { useState, useEffect } from "react";

const EditTaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title || "");
            setDescription(task.description || "");
            setCompleted(task.completed || false);
        }
    }, [task]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSave(task.id, {
            title,
            description,
            completed
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
            <div className="bg-bg-surface border border-border rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 text-text-primary">Editar Tarea</h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-text-secondary mb-2">Título</label>
                        <input
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-text-secondary mb-2">Descripción</label>
                        <textarea
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors min-h-[80px]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="w-4 h-4 rounded text-primary focus:ring-primary bg-bg-input border-border"
                            id="completed-check"
                        />
                        <label htmlFor="completed-check" className="text-text-primary cursor-pointer select-none">
                            Marcar como completada
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            className="px-4 py-2 rounded text-text-primary hover:bg-bg-surface-hover transition-colors font-medium border border-transparent hover:border-border"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded font-medium transition-colors"
                            onClick={handleSubmit}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default EditTaskModal;
