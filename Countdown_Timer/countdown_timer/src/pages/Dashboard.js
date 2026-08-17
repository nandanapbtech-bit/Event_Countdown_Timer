import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

const Dashboard = () => {

    const [events, setEvents] = useState([]);

    const { logout } = useAuth();

    const loadEvents = async () => {

        try {

            const response = await API.get(
                "events/"
            );

            setEvents(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const addEvent = (event) => {

        setEvents([
            ...events,
            event
        ]);

    };

    const deleteEvent = (id) => {

        setEvents(
            events.filter(
                event => event.id !== id
            )
        );

    };

    return (
        <div className="dashboard">

            <header>

                <h1>
                    ⏳ Event Countdown
                </h1>

                <button
                    onClick={logout}
                >
                    Logout
                </button>

            </header>

            <EventForm
                onEventAdded={addEvent}
            />

            <div className="events-container">

                {events.length === 0 ? (

                    <p className="empty">
                        No events yet. Add your first event!
                    </p>

                ) : (

                    events.map(event => (

                        <EventCard
                            key={event.id}
                            event={event}
                            onDelete={deleteEvent}
                        />

                    ))

                )}

            </div>

        </div>
    );
};

export default Dashboard;