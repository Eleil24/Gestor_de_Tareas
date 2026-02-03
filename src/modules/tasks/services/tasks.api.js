import api from "../../../api/axios";

export const getTasks = () => api.get("/tasks");

export const createTask = (task) =>
    api.post("/tasks", task);

export const updateTask = (id, task) =>
    api.put(`/tasks/${id}`, task);

export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);
