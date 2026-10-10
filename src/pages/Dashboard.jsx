import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const [applications, setApplications] = useState([]);
    const [interviews, setInterviews] = useState([]);

    const navigate = useNavigate();


    // =========================
    // LOAD DASHBOARD DATA
    // =========================

    useEffect(() => {
        fetchDashboardData();
    }, []);


    const fetchDashboardData = async () => {

        try {

            const applicationsResponse =
                await api.get("/job-applications");

            const interviewsResponse =
                await api.get("/interviews");

            setApplications(
                applicationsResponse.data
            );

            setInterviews(
                interviewsResponse.data
            );

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

            alert(
                "Failed to load dashboard data"
            );
        }
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
    // APPLICATION STATISTICS
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
    // INTERVIEW STATISTICS
    // =========================

    const scheduledInterviewCount =
        interviews.filter(
            (interview) =>
                interview.status === "SCHEDULED"
        ).length;


    const completedInterviewCount =
        interviews.filter(
            (interview) =>
                interview.status === "COMPLETED"
        ).length;


    const cancelledInterviewCount =
        interviews.filter(
            (interview) =>
                interview.status === "CANCELLED"
        ).length;


    // =========================
    // UPCOMING INTERVIEWS
    // =========================

    const currentDate =
        new Date();


    const upcomingInterviews =
        interviews
            .filter((interview) => {

                if (
                    interview.status !==
                    "SCHEDULED"
                ) {
                    return false;
                }

                const interviewDate =
                    new Date(
                        interview.interviewDate
                    );

                return (
                    !Number.isNaN(
                        interviewDate.getTime()
                    ) &&
                    interviewDate >= currentDate
                );

            })
            .sort(
                (a, b) =>
                    new Date(
                        a.interviewDate
                    ) -
                    new Date(
                        b.interviewDate
                    )
            )
            .slice(0, 5);


    // =========================
    // RECENT APPLICATIONS
    // =========================

    const recentApplications =
        applications
            .slice()
            .reverse()
            .slice(0, 5);


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

                    {/* DASHBOARD */}

                    <button
                        type="button"
                        className="nav-link active"
                        onClick={() =>
                            navigate(
                                "/dashboard"
                            )
                        }
                    >

                        <span>
                            📊
                        </span>

                        Dashboard

                    </button>


                    {/* JOB APPLICATIONS */}

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


                    {/* INTERVIEWS */}

                    <button
                        type="button"
                        className="nav-link"
                        onClick={() =>
                            navigate(
                                "/interviews"
                            )
                        }
                    >

                        <span>
                            📅
                        </span>

                        Interviews

                    </button>

                </nav>


                {/* LOGOUT */}

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


                {/* =========================
                    MOBILE HEADER
                ========================= */}

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


                {/* =========================
                    WELCOME
                ========================= */}

                <div className="topbar">

                    <div>

                        <p className="welcome-label">
                            YOUR CAREER COMMAND CENTER
                        </p>

                        <h1>
                            Welcome back! Let’s keep moving forward. 🚀
                        </h1>

                        <p>
                            Stay organized, track your applications,
                            and move closer to your next opportunity.
                        </p>

                    </div>

                </div>


                {/* =========================
                    APPLICATION OVERVIEW
                ========================= */}

                <section>

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Application Overview
                            </h2>

                            <p>
                                Your job search at a glance
                            </p>

                        </div>

                    </div>


                    <div className="stats-grid">


                        {/* TOTAL */}

                        <div className="stat-card">

                            <p>
                                Total Applications
                            </p>

                            <h2>
                                {applications.length}
                            </h2>

                            <span>
                                All applications
                            </span>

                        </div>


                        {/* APPLIED */}

                        <div className="stat-card">

                            <p>
                                Applied
                            </p>

                            <h2>
                                {appliedCount}
                            </h2>

                            <span>
                                Applications submitted
                            </span>

                        </div>


                        {/* INTERVIEW */}

                        <div className="stat-card">

                            <p>
                                Interview
                            </p>

                            <h2>
                                {interviewCount}
                            </h2>

                            <span>
                                Interview stage
                            </span>

                        </div>


                        {/* SELECTED */}

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


                        {/* REJECTED */}

                        <div className="stat-card">

                            <p>
                                Rejected
                            </p>

                            <h2>
                                {rejectedCount}
                            </h2>

                            <span>
                                Closed applications
                            </span>

                        </div>

                    </div>

                </section>


                {/* =========================
                    INTERVIEW STATISTICS
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Interview Statistics
                            </h2>

                            <p>
                                Keep track of your interview journey
                            </p>

                        </div>

                    </div>


                    <div className="stats-grid">


                        {/* TOTAL */}

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


                        {/* SCHEDULED */}

                        <div className="stat-card">

                            <p>
                                Scheduled
                            </p>

                            <h2>
                                {scheduledInterviewCount}
                            </h2>

                            <span>
                                Upcoming interviews
                            </span>

                        </div>


                        {/* COMPLETED */}

                        <div className="stat-card">

                            <p>
                                Completed
                            </p>

                            <h2>
                                {completedInterviewCount}
                            </h2>

                            <span>
                                Completed interviews
                            </span>

                        </div>


                        {/* CANCELLED */}

                        <div className="stat-card">

                            <p>
                                Cancelled
                            </p>

                            <h2>
                                {cancelledInterviewCount}
                            </h2>

                            <span>
                                Cancelled interviews
                            </span>

                        </div>

                    </div>

                </section>


                {/* =========================
                    UPCOMING INTERVIEWS
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Upcoming Interviews
                            </h2>

                            <p>
                                Your next scheduled interviews
                            </p>

                        </div>

                    </div>


                    {upcomingInterviews.length === 0 ? (

                        <div className="empty-state">

                            <h3>
                                No upcoming interviews
                            </h3>

                            <p>
                                You don't have any scheduled
                                interviews coming up.
                            </p>

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    navigate(
                                        "/interviews"
                                    )
                                }
                            >
                                Schedule Interview →
                            </button>

                        </div>

                    ) : (

                        <div className="application-list">

                            {upcomingInterviews.map(
                                (interview) => (

                                    <div
                                        className="application-item"
                                        key={
                                            interview.id
                                        }
                                    >

                                        <div className="application-info">

                                            <h3>
                                                {
                                                    interview.companyName
                                                }
                                            </h3>


                                            <p>

                                                <strong>
                                                    {
                                                        interview.jobTitle
                                                    }
                                                </strong>

                                                {" • "}

                                                {
                                                    interview.interviewType
                                                }

                                            </p>


                                            <p>

                                                📅{" "}

                                                {new Date(
                                                    interview.interviewDate
                                                ).toLocaleString()}

                                            </p>

                                        </div>


                                        <span className="status status-scheduled">

                                            SCHEDULED

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =========================
                    RECENT APPLICATIONS
                ========================= */}

                <section className="content-card">

                    <div className="content-card-header">

                        <div>

                            <h2>
                                Recent Applications
                            </h2>

                            <p>
                                Your latest job applications
                            </p>

                        </div>

                    </div>


                    {recentApplications.length === 0 ? (

                        <div className="empty-state">

                            <h3>
                                No job applications yet
                            </h3>

                            <p>
                                Start tracking your job applications
                                to build your career journey.
                            </p>

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() =>
                                    navigate(
                                        "/job-applications"
                                    )
                                }
                            >
                                Add Application →
                            </button>

                        </div>

                    ) : (

                        <div className="application-list">

                            {recentApplications.map(
                                (application) => (

                                    <div
                                        className="application-item"
                                        key={
                                            application.id
                                        }
                                    >

                                        <div className="application-info">

                                            <h3>
                                                {
                                                    application.jobTitle
                                                }
                                            </h3>

                                            <p>

                                                <strong>
                                                    {
                                                        application.companyName
                                                    }
                                                </strong>

                                                {" • "}

                                                {
                                                    application.jobLocation
                                                }

                                            </p>

                                        </div>


                                        <span
                                            className={`status status-${application.status.toLowerCase()}`}
                                        >

                                            {
                                                application.status
                                            }

                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* =========================
                    CALL TO ACTION
                ========================= */}

                <section className="content-card dashboard-cta">

                    <div>

                        <h2>
                            Keep your career moving 🚀
                        </h2>

                        <p>
                            Stay consistent, keep applying,
                            and let JobTrack organize your journey.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="primary-btn"
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

export default Dashboard;