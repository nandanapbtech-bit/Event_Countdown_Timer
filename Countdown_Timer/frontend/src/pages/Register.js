import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!username.trim()) {
            setError("Please enter a username.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post(
                "register/",
                {
                    username: username.trim(),
                    password: password
                }
            );

            console.log(
                "REGISTER SUCCESS:",
                response.data
            );

            setSuccess(
                "🎉 Registration successful! Redirecting to login..."
            );

            setUsername("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error.response?.data || error
            );

            const data = error.response?.data;

            if (data?.username) {

                setError(
                    Array.isArray(data.username)
                        ? data.username[0]
                        : data.username
                );

            } else if (data?.password) {

                setError(
                    Array.isArray(data.password)
                        ? data.password[0]
                        : data.password
                );

            } else if (data?.detail) {

                setError(data.detail);

            } else {

                setError(
                    "Registration failed. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    🎉
                </div>

                <h1>
                    Create Account
                </h1>

                <p className="auth-subtitle">
                    Join Event Countdown Timer and start tracking your events
                </p>


                <form onSubmit={handleRegister}>

                    <label>
                        👤 Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        disabled={loading}
                    />

                    <br></br>
                    <label>
                        🔒 Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        disabled={loading}
                    />

                    <br></br>                    
                    <label>
                        🔐 Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        disabled={loading}
                    />


                    {error && (
                        <div className="auth-error">
                            ⚠️ {error}
                        </div>
                    )}


                    {success && (
                        <div className="auth-success">
                            {success}
                        </div>
                    )}
                 <br></br>
                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "✨ Create Account"}

                    </button>
                
                </form>


                <p className="auth-link">

                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;