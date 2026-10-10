import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobApplications from "./pages/JobApplications";
import Interviews from "./pages/Interviews";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/job-applications"
                    element={
                        <ProtectedRoute>
                            <JobApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/interviews"
                    element={
                        <ProtectedRoute>
                            <Interviews />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;