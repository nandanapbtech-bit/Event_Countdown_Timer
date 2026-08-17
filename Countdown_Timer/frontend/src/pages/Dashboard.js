import React, { useEffect, useState } from "react";
import API from "../api/axios";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {

    const { logout } = useAuth();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEvents = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await API.get("events/");

            setEvents(response.data);

        } catch (error) {

            console.error(
                "FETCH EVENTS ERROR:",
                error.response?.data || error
            );

            setError("Unable to load your events.");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventAdded = (newEvent) => {

        setEvents((previousEvents) => [
            ...previousEvents,
            newEvent
        ]);
    };

    const handleEventDeleted = (deletedId) => {

        setEvents((previousEvents) =>
            previousEvents.filter(
                (event) => event.id !== deletedId
            )
        );
    };

    const handleLogout = () => {

        logout();
    };

    return (

        <div className="dashboard-page">

            {/* Decorative background */}
            <div className="background-circle circle-one"></div>
            <div className="background-circle circle-two"></div>
            <div className="background-circle circle-three"></div>

            {/* NAVBAR */}

            <header className="dashboard-navbar">

                <div className="brand">

                    <div className="brand-icon">
                        ⏰
                    </div>

                    <div>
                        
                        <h2>Event Countdown Timer</h2>
                    </div>

                </div>

                <div className="user-section">

                    <div className="welcome-text">
                        <span>Welcome back 👋</span>
                        <strong>Admin</strong>
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </header>


            {/* MAIN CONTENT */}

            <main className="dashboard-container">

                {/* HERO SECTION */}

                <section className="hero-section">

                    <div className="hero-content">

                        <div className="hero-badge">
                            ✨ Stay ahead of every moment
                        </div>

                        <h2>
                            Your Special
                            <span> Moments </span>
                            Await!
                        </h2>

                        <p>
                            Keep track of birthdays, celebrations,
                            college events and every important moment
                            with a live countdown.
                        </p>

                    </div>

                    <div className="hero-emoji">
                        🎉
                    </div>

                </section>


                {/* ADD EVENT */}

                <section className="event-form-section">

                    <div className="section-heading">

                        <div className="heading-icon">
                            ➕
                        </div>

                        <div>
                            <h2>Create New Event</h2>
                            <p>
                                Add a special moment to your countdown
                            </p>
                        </div>

                    </div>

                    <EventForm
                        onEventAdded={handleEventAdded}
                    />

                </section>


                {/* EVENTS */}

                <section className="events-section">

                    <div className="events-heading">

                        <div>

                            <div className="heading-title">
                                <span>💫</span>
                                <h2>Upcoming Events</h2>
                            </div>

                            <p>
                                Your moments, all in one place
                            </p>

                        </div>

                        <div className="event-count">
                            {events.length}
                            <span>
                                {events.length === 1
                                    ? " Event"
                                    : " Events"}
                            </span>
                        </div>

                    </div>


                    {loading && (

                        <div className="status-card loading-card">

                            <div className="loading-spinner"></div>

                            <p>
                                Loading your events...
                            </p>

                        </div>

                    )}


                    {!loading && error && (

                        <div className="status-card error-card">

                            <div className="status-icon">
                                ⚠️
                            </div>

                            <p>{error}</p>

                            <button
                                onClick={fetchEvents}
                                className="retry-button"
                            >
                                Try Again
                            </button>

                        </div>

                    )}


                    {!loading &&
                        !error &&
                        events.length === 0 && (

                            <div className="empty-state">

                                <div className="empty-emoji">
                                    🗓️
                                </div>

                                <h3>
                                    No events yet
                                </h3>

                                <p>
                                    Create your first event above
                                    and start counting down! ✨
                                </p>

                            </div>

                        )}


                    {!loading &&
                        !error &&
                        events.length > 0 && (

                            <div className="events-grid">

                                {events.map((event) => (

                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        onDelete={handleEventDeleted}
                                    />

                                ))}

                            </div>

                        )}

                </section>

            </main>


            {/* FOOTER */}

            <footer className="dashboard-footer">

                <p>
                    Made with ❤️ for your special moments
                </p>

                <span>
                    ⏳ Every second counts!
                </span>

            </footer>

        </div>
    );
}

export default Dashboard;