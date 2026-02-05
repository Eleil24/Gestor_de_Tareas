import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/tasks.api";
import TaskCard from "../../../components/TaskCard";
import EditTaskModal from "../../../components/EditTaskModal";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [filterTitle, setFilterTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filterCompleted, setFilterCompleted] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [editingTask, setEditingTask] = useState(null); // Task currently being edited

    const fetchTasks = async () => {
        try {
            const formattedStartDate = startDate ? `${startDate}T00:00:00` : "";
            const formattedEndDate = endDate ? `${endDate}T23:59:59` : "";

            const res = await getTasks(page, 6, filterTitle, formattedStartDate, formattedEndDate, filterCompleted);

            if (res.data.content) {
                setTasks(res.data.content);
                setTotalPages(res.data.totalPages);
            } else {
                setTasks(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, filterTitle, startDate, endDate, filterCompleted]);

    const handleCreateTask = async () => {
        try {
            await createTask({ title, description });
            fetchTasks();
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex-col">
            <header className="flex-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Gestor de Tareas</h1>
                    <p className="text-sm">Administra tus pendientes de forma eficiente.</p>
                </div>
            </header>

            <section className="card">
                <h3>Nueva Tarea</h3>
                <div className="flex-row">
                    <input
                        type="text"
                        placeholder="Título de la tarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="text"
                        placeholder="Descripción opcional"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ flex: 2 }}
                    />
                    <button className="primary" onClick={handleCreateTask}>
                        Crear +
                    </button>
                </div>
            </section>

            <section className="card">
                <h3>Filtros</h3>
                <div className="flex-row">
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        value={filterTitle}
                        onChange={(e) => setFilterTitle(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="text-sm">hasta</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <select
                        value={filterCompleted}
                        onChange={(e) => setFilterCompleted(e.target.value)}
                    >
                        <option value="">Estado: Todos</option>
                        <option value="true">Completados</option>
                        <option value="false">Pendientes</option>
                    </select>
                    <button onClick={() => {
                        setFilterTitle("");
                        setStartDate("");
                        setEndDate("");
                        setFilterCompleted("");
                        setPage(0);
                    }}>
                        Reset
                    </button>
                </div>
            </section>

            {tasks.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p>No se encontraron tareas que coincidan con la búsqueda.</p>
                </div>
            ) : (
                <div className="grid-cols-3">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={handleDeleteTask}
                            onUpdate={handleUpdateTask}
                            onEdit={(taskToEdit) => setEditingTask(taskToEdit)}
                        />
                    ))}
                </div>
            )}

            <div className="flex-row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    &larr; Anterior
                </button>
                <span className="text-sm font-bold">
                    Página {page + 1} de {totalPages || 1}
                </span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages - 1}
                >
                    Siguiente &rarr;
                </button>
            </div>

            <EditTaskModal
                isOpen={!!editingTask}
                onClose={() => setEditingTask(null)}
                onSave={handleUpdateTask}
                task={editingTask}
            />
        </div>
    );
};

export default TasksPage;
