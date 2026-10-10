import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Interviews() {

    const [interviews, setInterviews] = useState([]);
    const [applications, setApplications] = useState([]);

    const [applicationId, setApplicationId] = useState("");
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewType, setInterviewType] = useState("");
    const [status, setStatus] = useState("SCHEDULED");

    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();


    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {

        fetchApplications();
        fetchInterviews();

    }, []);


    // =========================
    // FETCH APPLICATIONS
    // =========================

    const fetchApplications = async () => {

        try {

            const response =
                await api.get("/job-applications");

            setApplications(response.data);

        } catch (error) {

            console.error(
                "Fetch Applications Error:",
                error
            );

            alert(
                "Failed to load your job applications"
            );
        }
    };


    // =========================
    // FETCH INTERVIEWS
    // =========================

    const fetchInterviews = async () => {

        try {

            const response =
                await api.get("/interviews");

            setInterviews(response.data);

        } catch (error) {

            console.error(
                "Fetch Interviews Error:",
                error
            );

            alert(
                "Failed to load interviews"
            );
        }
    };


    // =========================
    // FORMAT DATE FOR INPUT
    // =========================

    const formatDateForInput = (dateValue) => {

        if (!dateValue) {
            return "";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        const hours =
            String(
                date.getHours()
            ).padStart(2, "0");

        const minutes =
            String(
                date.getMinutes()
            ).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


    // =========================
    // ADD / UPDATE INTERVIEW
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // CREATE
            if (editingId === null) {

                if (!applicationId) {

                    alert(
                        "Please select a job application"
                    );

                    return;
                }


                const interviewData = {

                    interviewDate,
                    interviewType,
                    status

                };


                await api.post(
                    `/interviews/application/${applicationId}`,
                    interviewData
                );


                alert(
                    "Interview scheduled successfully!"
                );

            }

            // UPDATE
            else {

                const interviewData = {

                    interviewDate,
                    interviewType,
                    status

                };


                await api.put(
                    `/interviews/${editingId}`,
                    interviewData
                );


                alert(
                    "Interview updated successfully!"
                );
            }


            clearForm();

            await fetchInterviews();

        } catch (error) {

            console.error(
                "Save Interview Error:",
                error
            );

            console.error(
                "Response:",
                error.response
            );

            console.error(
                "Response Data:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Failed to save interview"
            );
        }
    };


    // =========================
    // EDIT INTERVIEW
    // =========================

    const handleEdit = (interview) => {

        setEditingId(
            interview.id
        );

        setInterviewDate(
            formatDateForInput(
                interview.interviewDate
            )
        );

        setInterviewType(
            interview.interviewType || ""
        );

        setStatus(
            interview.status || "SCHEDULED"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // DELETE INTERVIEW
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this interview?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            await api.delete(
                `/interviews/${id}`
            );


            alert(
                "Interview deleted successfully!"
            );


            await fetchInterviews();

        } catch (error) {

            console.error(
                "Delete Interview Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete interview"
            );
        }
    };


    // =========================
    // CLEAR FORM
    // =========================

    const clearForm = () => {

        setEditingId(null);

        setApplicationId("");

        setInterviewDate("");

        setInterviewType("");

        setStatus("SCHEDULED");
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("token");

        alert(
            "Logged out successfully!"
        );

        navigate("/");
    };


    // =========================
    // STATISTICS
    // =========================

    const scheduledCount =
        interviews.filter(
            (interview) =>
                interview.status === "SCHEDULED"
        ).length;


    const completedCount =
        interviews.filter(
            (interview) =>
                interview.status === "COMPLETED"
        ).length;


    const cancelledCount =
        interviews.filter(
            (interview) =>
                interview.status === "CANCELLED"
        ).length;


    // =========================
    // STATUS CLASS
    // =========================

    const getStatusClass = (
        interviewStatus
    ) => {

        if (!interviewStatus) {
            return "status";
        }

        return `status status-${interviewStatus.toLowerCase()}`;
    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <span>
                        JT
                    </span>

                    <div>

                        <h2>
                            JobTrack
                        </h2>

                        <p>
                            Career Manager
                        </p>

                    </div>

                </div>


                <nav className="nav-menu">

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <span>
                            📊
                        </span>

                        Dashboard

                    </button>


                    <button
                        type="button"
                        className="nav-link"
                        onClick={() =>
                            navigate(
                                "/job-applications"
                            )
                        }
                    >
                        <span>
                            💼
                        </span>

                        Job Applications

                    </button>


                    <button
                        type="button"
                        className="nav-link active"
                        onClick={() =>
                            navigate("/interviews")
                        }
                    >
                        <span>
                            📅
                        </span>

                        Interviews

                    </button>

                </nav>


                <button
                    type="button"
                    className="nav-link logout-sidebar"
                    onClick={handleLogout}
                >
                    <span>
                        🚪
                    </span>

                    Logout

                </button>

            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">

                {/* MOBILE HEADER */}

                <div className="mobile-header">

                    <div className="sidebar-logo">

                        <span>
                            JT
                        </span>

                        <div>

                            <h2>
                                JobTrack
                            </h2>

                        </div>

                    </div>

                </div>


                {/* PAGE HEADER */}

                <div className="topbar">

                    <div>

                        <p className="welcome-label">
                            CAREER INTERVIEW HUB
                        </p>

                        <h1>
                            Interviews 📅
                        </h1>

                        <p>
                            Stay prepared, track every
                            interview, and never miss an
                            opportunity.
                        </p>

                    </div>

                </div>


                {/* =========================
                    STATISTICS
                ========================= */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <p>
                            Total Interviews
                        </p>

                        <h2>
                            {interviews.length}
                        </h2>

                        <span>
                            All tracked interviews
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Scheduled
                        </p>

                        <h2>
                            {scheduledCount}
                        </h2>

                        <span>
                            Upcoming interviews
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Completed
                        </p>

                        <h2>
                            {completedCount}
                        </h2>

                        <span>
                            Completed interviews
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Cancelled
                        </p>

                        <h2>
                            {cancelledCount}
                        </h2>

                        <span>
                            Cancelled interviews
                        </span>

                    </div>

                </div>


                {/* =========================
                    ADD / EDIT INTERVIEW
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                {editingId === null
                                    ? "Schedule New Interview"
                                    : "Edit Interview"}
                            </h2>

                            <p>
                                {editingId === null
                                    ? "Connect an interview with one of your job applications."
                                    : "Update your interview details."}
                            </p>

                        </div>

                    </div>


                    {applications.length === 0 &&
                        editingId === null ? (

                        <div className="empty-state">

                            <h3>
                                No job applications available
                            </h3>

                            <p>
                                Add a job application first
                                before scheduling an interview.
                            </p>

                            <button
                                type="button"
                                className="primary-btn"
                                onClick={() =>
                                    navigate(
                                        "/job-applications"
                                    )
                                }
                            >
                                Add Job Application
                            </button>

                        </div>

                    ) : (

                        <form
                            className="page-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="form-grid">

                                {/* JOB APPLICATION */}

                                {editingId === null && (

                                    <div className="form-group">

                                        <label>
                                            Job Application
                                        </label>

                                        <select
                                            value={
                                                applicationId
                                            }
                                            onChange={(e) =>
                                                setApplicationId(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >

                                            <option value="">
                                                Select a job application
                                            </option>


                                            {applications.map(
                                                (application) => (

                                                    <option
                                                        key={
                                                            application.id
                                                        }
                                                        value={
                                                            application.id
                                                        }
                                                    >

                                                        {application.companyName}
                                                        {" - "}
                                                        {application.jobTitle}

                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>

                                )}


                                {/* INTERVIEW DATE */}

                                <div className="form-group">

                                    <label>
                                        Interview Date & Time
                                    </label>

                                    <input
                                        type="datetime-local"
                                        value={
                                            interviewDate
                                        }
                                        onChange={(e) =>
                                            setInterviewDate(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* INTERVIEW TYPE */}

                                <div className="form-group">

                                    <label>
                                        Interview Type
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Technical / HR"
                                        value={
                                            interviewType
                                        }
                                        onChange={(e) =>
                                            setInterviewType(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {/* STATUS */}

                                <div className="form-group">

                                    <label>
                                        Interview Status
                                    </label>

                                    <select
                                        value={
                                            status
                                        }
                                        onChange={(e) =>
                                            setStatus(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="SCHEDULED">
                                            SCHEDULED
                                        </option>

                                        <option value="COMPLETED">
                                            COMPLETED
                                        </option>

                                        <option value="CANCELLED">
                                            CANCELLED
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* FORM BUTTONS */}

                            <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-btn"
                                >

                                    {editingId === null
                                        ? "＋ Schedule Interview"
                                        : "✓ Update Interview"}

                                </button>


                                {editingId !== null && (

                                    <button
                                        type="button"
                                        className="secondary-btn"
                                        onClick={clearForm}
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

                        </form>

                    )}

                </section>


                {/* =========================
                    INTERVIEW LIST
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Your Interviews
                            </h2>

                            <p>

                                {interviews.length === 0
                                    ? "Your scheduled interviews will appear here."
                                    : `${interviews.length} interview${interviews.length > 1 ? "s" : ""} in your career pipeline.`}

                            </p>

                        </div>

                    </div>


                    {interviews.length === 0 ? (

                        <div className="empty-state">

                            <div
                                style={{
                                    fontSize: "45px",
                                    marginBottom: "15px"
                                }}
                            >
                                📅
                            </div>

                            <h3>
                                No interviews yet
                            </h3>

                            <p>
                                Schedule your first interview
                                and keep your career journey organized.
                            </p>

                        </div>

                    ) : (

                        <div className="application-list">

                            {interviews
                                .slice()
                                .reverse()
                                .map((interview) => (

                                    <div
                                        className="application-item"
                                        key={interview.id}
                                    >

                                        {/* INTERVIEW INFORMATION */}

                                        <div className="application-info">

                                            <h3>

                                                {interview.interviewType}
                                                {" "}
                                                Interview

                                            </h3>


                                            <p>

                                                <strong>
                                                    🏢{" "}
                                                    {interview.companyName}
                                                </strong>

                                                {" • "}

                                                {interview.jobTitle}

                                            </p>


                                            <p>

                                                📅{" "}

                                                {new Date(
                                                    interview.interviewDate
                                                ).toLocaleString()}

                                            </p>

                                        </div>


                                        {/* STATUS */}

                                        <span
                                            className={
                                                getStatusClass(
                                                    interview.status
                                                )
                                            }
                                        >
                                            {interview.status}
                                        </span>


                                        {/* ACTIONS */}

                                        <div className="application-actions">

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(
                                                        interview
                                                    )
                                                }
                                            >
                                                ✏️ Edit
                                            </button>


                                            <button
                                                type="button"
                                                className="danger-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        interview.id
                                                    )
                                                }
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </section>


                {/* =========================
                    BOTTOM CTA
                ========================= */}

                <section className="content-card dashboard-cta">

                    <div>

                        <h2>
                            Prepare. Perform. Progress. 🚀
                        </h2>

                        <p>
                            Every interview is another step
                            toward your next opportunity.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={() =>
                            navigate(
                                "/job-applications"
                            )
                        }
                    >
                        View Applications →
                    </button>

                </section>

            </main>

        </div>
    );
}

export default Interviews;