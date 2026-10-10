import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/register", {
                name: name,
                email: email,
                password: password
            });

            console.log("Register Response:", response.data);

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            console.error("Register Error:", error.response);

            alert("Registration failed!");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-logo">
                    <h1>JobTrack</h1>
                    <p>Create your account and start tracking your career.</p>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >

                    <div className="form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
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
                        Create Account
                    </button>

                </form>

                <div className="auth-footer">

                    <p>
                        Already have an account?{" "}
                        <Link to="/">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;