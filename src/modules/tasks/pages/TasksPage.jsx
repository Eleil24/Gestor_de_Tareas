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
        <div className="flex flex-col gap-8 w-full">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="mb-2 text-3xl font-bold text-text-primary">Gestor de Tareas</h1>
                    <p className="text-sm text-text-secondary">Administra tus pendientes de forma eficiente.</p>
                </div>
            </header>

            <section className="bg-bg-surface border border-border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">Nueva Tarea</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        className="flex-1 bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                        type="text"
                        placeholder="Título de la tarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="flex-[2] bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                        type="text"
                        placeholder="Descripción opcional"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded font-medium transition-colors"
                        onClick={handleCreateTask}
                    >
                        Crear +
                    </button>
                </div>
            </section>

            <section className="bg-bg-surface border border-border rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-text-primary">Filtros</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-4">
                        <input
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                            type="text"
                            placeholder="Buscar por título..."
                            value={filterTitle}
                            onChange={(e) => setFilterTitle(e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <input
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="hidden lg:block text-center text-sm text-text-secondary lg:col-span-auto">
                        hasta
                    </div>

                    <div className="lg:col-span-2">
                        <input
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <select
                            className="w-full bg-bg-input border border-border rounded px-4 py-2 text-text-primary focus:outline-none focus:border-primary transition-colors"
                            value={filterCompleted}
                            onChange={(e) => setFilterCompleted(e.target.value)}
                        >
                            <option value="">Estado: Todos</option>
                            <option value="true">Completados</option>
                            <option value="false">Pendientes</option>
                        </select>
                    </div>

                    <div className="lg:col-span-1">
                        <button
                            className="w-full bg-bg-surface hover:bg-bg-surface-hover border border-border text-text-primary px-4 py-2 rounded font-medium transition-colors"
                            onClick={() => {
                                setFilterTitle("");
                                setStartDate("");
                                setEndDate("");
                                setFilterCompleted("");
                                setPage(0);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </section>

            {tasks.length === 0 ? (
                <div className="bg-bg-surface border border-border rounded-lg p-8 text-center text-text-secondary shadow-md">
                    <p>No se encontraron tareas que coincidan con la búsqueda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    className="bg-bg-surface border border-border text-text-primary px-4 py-2 rounded hover:bg-bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    &larr; Anterior
                </button>
                <span className="text-sm font-bold text-text-primary">
                    Página {page + 1} de {totalPages || 1}
                </span>
                <button
                    className="bg-bg-surface border border-border text-text-primary px-4 py-2 rounded hover:bg-bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
