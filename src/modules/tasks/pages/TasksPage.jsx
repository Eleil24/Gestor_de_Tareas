import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../services/tasks.api";
import TaskCard from "../../../components/TaskCard";

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

    const fetchTasks = async () => {
        try {
            const formattedStartDate = startDate ? `${startDate}T00:00:00` : "";
            const formattedEndDate = endDate ? `${endDate}T23:59:59` : "";

            const res = await getTasks(page, 5, filterTitle, formattedStartDate, formattedEndDate, filterCompleted);
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
            await createTask({
                title,
                description
            });

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
        <div>
            <h1>Gestor de Tareas</h1>

            {/* Filters */}
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
                <h3>Filtros</h3>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <select
                    value={filterCompleted}
                    onChange={(e) => setFilterCompleted(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                >
                    <option value="">Todos</option>
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
                    Limpiar Filtros
                </button>
            </div>

            {/* Create Task Form */}
            <div style={{ marginBottom: "20px" }}>
                <h3>Crear Tarea Nueva</h3>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={handleCreateTask}>
                    Crear tarea
                </button>
            </div>

            {tasks.length === 0 && <p>No hay tareas</p>}

            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))}

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                >
                    Anterior
                </button>
                <span>Página {page + 1} {totalPages > 0 ? `de ${totalPages}` : ""}</span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages - 1}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );

}

export default TasksPage;
