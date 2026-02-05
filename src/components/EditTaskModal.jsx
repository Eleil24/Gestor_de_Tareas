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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Editar Tarea</h2>

                <div className="flex-col">
                    <div>
                        <label className="text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label className="text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ width: '100%', minHeight: '80px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div className="flex-row" style={{ marginTop: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            style={{ width: 'auto' }}
                            id="completed-check"
                        />
                        <label htmlFor="completed-check" style={{ cursor: 'pointer' }}>
                            Marcar como completada
                        </label>
                    </div>

                    <div className="flex-row" style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="primary" onClick={handleSubmit}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
