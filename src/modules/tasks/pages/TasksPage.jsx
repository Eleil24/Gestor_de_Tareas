import { useEffect, useState } from "react";
import { getTasks } from "../services/tasks.api";
import TaskCard from "../../../components/TaskCard";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks()
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Gestor de Tareas</h1>

            {tasks.length === 0 && <p>No hay tareas</p>}

            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}

        </div>
    );
}

export default TasksPage;
