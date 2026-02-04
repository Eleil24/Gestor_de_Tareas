import api from "../../../api/axios";

export const getTasks = (page = 0, size = 5, title, startDate, endDate, completed) => {
    const params = {
        page,
        size,
    };
    if (title) params.title = title;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (completed !== undefined && completed !== "") params.completed = completed;

    return api.get("/tasks", { params });
};

export const createTask = (task) =>
    api.post("/tasks", task);

export const updateTask = (id, task) =>
    api.put(`/tasks/${id}`, task);

export const deleteTask = (id) =>
    api.delete(`/tasks/${id}`);
