import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            console.log("LOGIN RESPONSE:", response);
            console.log("JWT TOKEN:", response.data);

            // Store JWT token
            localStorage.setItem("token", response.data);

            // Verify token was stored
            console.log(
                "TOKEN STORED:",
                localStorage.getItem("token")
            );

            alert("Login successful!");

            navigate("/dashboard");

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            if (error.response) {
                console.error(
                    "STATUS:",
                    error.response.status
                );

                console.error(
                    "DATA:",
                    error.response.data
                );
            }

            alert(
                error.response?.data ||
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-logo">

                    <h1>JobTrack</h1>

                    <p>
                        Track your job search. Build your career.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Login
                    </button>

                </form>

                <div className="auth-footer">

                    <p>
                        Don't have an account?{" "}

                        <Link to="/register">
                            Create an account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;