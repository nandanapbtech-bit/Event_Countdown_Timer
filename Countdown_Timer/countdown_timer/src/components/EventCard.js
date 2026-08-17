import React, { useEffect, useState } from "react";
import API from "../api/axios";

const EventCard = ({ event, onDelete }) => {

    const calculateTime = () => {

        const now = new Date().getTime();
        const target = new Date(event.target_date).getTime();

        const difference = target - now;

        if (difference <= 0) {
            return null;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const [timeLeft, setTimeLeft] =
        useState(calculateTime());

    useEffect(() => {

        const timer = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const deleteEvent = async () => {

        try {

            await API.delete(
                `events/${event.id}/`
            );

            onDelete(event.id);

        } catch (error) {

            alert("Could not delete event");

        }
    };

    return (
        <div className="event-card">

            <h3>{event.title}</h3>

            {timeLeft ? (

                <div className="countdown">

                    <div>
                        <strong>
                            {timeLeft.days}
                        </strong>
                        <span>Days</span>
                    </div>

                    <div>
                        <strong>
                            {timeLeft.hours}
                        </strong>
                        <span>Hours</span>
                    </div>

                    <div>
                        <strong>
                            {timeLeft.minutes}
                        </strong>
                        <span>Minutes</span>
                    </div>

                    <div>
                        <strong>
                            {timeLeft.seconds}
                        </strong>
                        <span>Seconds</span>
                    </div>

                </div>

            ) : (

                <h4 className="expired">
                    🎉 Event Started!
                </h4>

            )}

            <p>
                {new Date(
                    event.target_date
                ).toLocaleString()}
            </p>

            <button
                className="delete-btn"
                onClick={deleteEvent}
            >
                Delete
            </button>

        </div>
    );
};

export default EventCard;