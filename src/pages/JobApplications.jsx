import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function JobApplications() {

    const [applications, setApplications] = useState([]);

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [status, setStatus] = useState("APPLIED");

    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();


    // =========================
    // LOAD APPLICATIONS
    // =========================

    useEffect(() => {
        fetchApplications();
    }, []);

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

            alert("Failed to load job applications");
        }
    };


    // =========================
    // ADD / UPDATE APPLICATION
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const applicationData = {
                companyName,
                jobTitle,
                jobLocation,
                status
            };


            if (editingId === null) {

                await api.post(
                    "/job-applications",
                    applicationData
                );

                alert(
                    "Job application added successfully!"
                );

            } else {

                await api.put(
                    `/job-applications/${editingId}`,
                    applicationData
                );

                alert(
                    "Job application updated successfully!"
                );
            }


            clearForm();

            await fetchApplications();

        } catch (error) {

            console.error(
                "Save Application Error:",
                error
            );

            alert(
                "Failed to save job application"
            );
        }
    };


    // =========================
    // EDIT APPLICATION
    // =========================

    const handleEdit = (application) => {

        setEditingId(application.id);

        setCompanyName(
            application.companyName || ""
        );

        setJobTitle(
            application.jobTitle || ""
        );

        setJobLocation(
            application.jobLocation || ""
        );

        setStatus(
            application.status || "APPLIED"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // =========================
    // DELETE APPLICATION
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this application?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/job-applications/${id}`
            );

            alert(
                "Application deleted successfully!"
            );

            await fetchApplications();

        } catch (error) {

            console.error(
                "Delete Application Error:",
                error
            );

            alert(
                "Failed to delete application"
            );
        }
    };


    // =========================
    // CLEAR FORM
    // =========================

    const clearForm = () => {

        setEditingId(null);

        setCompanyName("");
        setJobTitle("");
        setJobLocation("");
        setStatus("APPLIED");
    };


    // =========================
    // STATUS COUNTS
    // =========================

    const appliedCount =
        applications.filter(
            (application) =>
                application.status === "APPLIED"
        ).length;

    const interviewCount =
        applications.filter(
            (application) =>
                application.status === "INTERVIEW"
        ).length;

    const selectedCount =
        applications.filter(
            (application) =>
                application.status === "SELECTED"
        ).length;

    const rejectedCount =
        applications.filter(
            (application) =>
                application.status === "REJECTED"
        ).length;


    // =========================
    // STATUS CLASS
    // =========================

    const getStatusClass = (applicationStatus) => {

        return `status status-${applicationStatus.toLowerCase()}`;
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {

        localStorage.removeItem("token");

        alert("Logged out successfully!");

        navigate("/");
    };


    return (

        <div className="app-layout">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <span>JT</span>

                    <div>

                        <h2>JobTrack</h2>

                        <p>
                            Career Manager
                        </p>

                    </div>

                </div>


                <nav className="nav-menu">

                    <button
                        className="nav-link"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <span>📊</span>
                        Dashboard
                    </button>


                    <button
                        className="nav-link active"
                        onClick={() =>
                            navigate("/job-applications")
                        }
                    >
                        <span>💼</span>
                        Job Applications
                    </button>


                    <button
                        className="nav-link"
                        onClick={() =>
                            navigate("/interviews")
                        }
                    >
                        <span>📅</span>
                        Interviews
                    </button>

                </nav>


                <button
                    className="nav-link logout-sidebar"
                    onClick={handleLogout}
                >
                    <span>🚪</span>
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

                        <span>JT</span>

                        <div>
                            <h2>JobTrack</h2>
                        </div>

                    </div>

                </div>


                {/* PAGE HEADER */}

                <div className="topbar">

                    <div>

                        <p className="welcome-label">
                            CAREER APPLICATION HUB
                        </p>

                        <h1>
                            Job Applications 💼
                        </h1>

                        <p>
                            Organize every opportunity and
                            keep your job search moving forward.
                        </p>

                    </div>

                </div>


                {/* =========================
                    APPLICATION SUMMARY
                ========================= */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <p>
                            Total Applications
                        </p>

                        <h2>
                            {applications.length}
                        </h2>

                        <span>
                            Opportunities tracked
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Applied
                        </p>

                        <h2>
                            {appliedCount}
                        </h2>

                        <span>
                            Waiting for response
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Interviews
                        </p>

                        <h2>
                            {interviewCount}
                        </h2>

                        <span>
                            Interview stage
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Selected
                        </p>

                        <h2>
                            {selectedCount}
                        </h2>

                        <span>
                            Successful applications
                        </span>

                    </div>


                    <div className="stat-card">

                        <p>
                            Rejected
                        </p>

                        <h2>
                            {rejectedCount}
                        </h2>

                        <span>
                            Opportunities closed
                        </span>

                    </div>

                </div>


                {/* =========================
                    ADD / EDIT FORM
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                {editingId === null
                                    ? "Add New Application"
                                    : "Edit Application"}
                            </h2>

                            <p>
                                {editingId === null
                                    ? "Record a new job opportunity you're pursuing."
                                    : "Update the details of this application."}
                            </p>

                        </div>

                    </div>


                    <form
                        className="page-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            {/* COMPANY */}

                            <div className="form-group">

                                <label>
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. TCS"
                                    value={companyName}
                                    onChange={(e) =>
                                        setCompanyName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* JOB TITLE */}

                            <div className="form-group">

                                <label>
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Java Developer"
                                    value={jobTitle}
                                    onChange={(e) =>
                                        setJobTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* LOCATION */}

                            <div className="form-group">

                                <label>
                                    Job Location
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Hyderabad"
                                    value={jobLocation}
                                    onChange={(e) =>
                                        setJobLocation(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* STATUS */}

                            <div className="form-group">

                                <label>
                                    Application Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="APPLIED">
                                        APPLIED
                                    </option>

                                    <option value="INTERVIEW">
                                        INTERVIEW
                                    </option>

                                    <option value="SELECTED">
                                        SELECTED
                                    </option>

                                    <option value="REJECTED">
                                        REJECTED
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
                                    ? "＋ Add Application"
                                    : "✓ Update Application"}
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

                </section>


                {/* =========================
                    APPLICATION LIST
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Your Applications
                            </h2>

                            <p>

                                {applications.length === 0
                                    ? "Your tracked opportunities will appear here."
                                    : `${applications.length} application${applications.length > 1 ? "s" : ""} in your career pipeline.`}

                            </p>

                        </div>

                    </div>


                    {applications.length === 0 ? (

                        <div className="empty-state">

                            <div
                                style={{
                                    fontSize: "45px",
                                    marginBottom: "15px"
                                }}
                            >
                                💼
                            </div>

                            <h3>
                                Your career pipeline is empty
                            </h3>

                            <p>
                                Add your first job application
                                and start building your career journey.
                            </p>

                        </div>

                    ) : (

                        <div className="application-list">

                            {applications
                                .slice()
                                .reverse()
                                .map((application) => (

                                    <div
                                        className="application-item"
                                        key={application.id}
                                    >

                                        <div className="application-info">

                                            <h3>
                                                {application.jobTitle}
                                            </h3>

                                            <p>

                                                <strong>
                                                    {application.companyName}
                                                </strong>

                                                {" • "}

                                                {application.jobLocation}

                                            </p>

                                        </div>


                                        <span
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {application.status}
                                        </span>


                                        <div className="application-actions">

                                            <button
                                                type="button"
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(
                                                        application
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
                                                        application.id
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
                            Every application is a step forward 🚀
                        </h2>

                        <p>
                            Keep applying, keep learning, and keep
                            moving closer to your next opportunity.
                        </p>

                    </div>


                    <button
                        className="secondary-btn"
                        onClick={() =>
                            navigate("/interviews")
                        }
                    >
                        View Interviews →
                    </button>

                </section>

            </main>

        </div>
    );
}

export default JobApplications;