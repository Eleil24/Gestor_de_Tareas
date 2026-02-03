import { BrowserRouter, Routes, Route } from "react-router-dom";
import TasksPage from "../modules/tasks/pages/TasksPage.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TasksPage />} />
            </Routes>
        </BrowserRouter>
    );
}
