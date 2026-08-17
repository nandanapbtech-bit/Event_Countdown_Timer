import React, { useEffect, useState } from "react";
import API from "../api/axios";

function EventCard({ event, onDelete }) {

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isDeleting, setIsDeleting] = useState(false);

    const calculateTime = () => {

        const target = new Date(
            event.target_date
        ).getTime();

        const now = new Date().getTime();

        const difference = target - now;

        if (difference <= 0) {

            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });

            return;
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

        setTimeLeft({
            days,
            hours,
            minutes,
            seconds
        });
    };


    useEffect(() => {

        calculateTime();

        const timer = setInterval(
            calculateTime,
            1000
        );

        return () => {
            clearInterval(timer);
        };

    }, [event.target_date]);


    const handleDelete = async () => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${event.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setIsDeleting(true);

            await API.delete(
                `events/${event.id}/`
            );

            if (onDelete) {
                onDelete(event.id);
            }

        } catch (error) {

            console.error(
                "DELETE EVENT ERROR:",
                error.response?.data || error
            );

            alert(
                "Could not delete the event. Please try again."
            );

            setIsDeleting(false);
        }
    };


    const isFinished =
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0;


    return (

        <article className="event-card">

            {/* Colourful top decoration */}

            <div className="event-card-top">

                <div className="event-icon">
                    🎯
                </div>

                <span className="event-label">
                    COUNTDOWN
                </span>

            </div>


            {/* Event title */}

            <h3 className="event-title">
                {event.title}
            </h3>


            {/* Target date */}

            <div className="event-date">

                <span className="date-icon">
                    📅
                </span>

                <span>
                    {new Date(
                        event.target_date
                    ).toLocaleString()}
                </span>

            </div>


            {/* Countdown */}

            <div className="countdown-box">

                <div className="countdown-title">

                    {isFinished
                        ? "🎉 Event Started!"
                        : "⏳ Time Remaining"}

                </div>


                {!isFinished ? (

                    <div className="countdown-values">

                        <div className="time-unit">
                            <strong>
                                {String(
                                    timeLeft.days
                                ).padStart(2, "0")}
                            </strong>
                            <span>Days</span>
                        </div>

                        <div className="time-separator">
                            :
                        </div>

                        <div className="time-unit">
                            <strong>
                                {String(
                                    timeLeft.hours
                                ).padStart(2, "0")}
                            </strong>
                            <span>Hours</span>
                        </div>

                        <div className="time-separator">
                            :
                        </div>

                        <div className="time-unit">
                            <strong>
                                {String(
                                    timeLeft.minutes
                                ).padStart(2, "0")}
                            </strong>
                            <span>Min</span>
                        </div>

                        <div className="time-separator">
                            :
                        </div>

                        <div className="time-unit seconds-unit">
                            <strong>
                                {String(
                                    timeLeft.seconds
                                ).padStart(2, "0")}
                            </strong>
                            <span>Sec</span>
                        </div>

                    </div>

                ) : (

                    <div className="event-started">
                        🎊 The moment has arrived!
                    </div>

                )}

            </div>


            {/* Delete */}

            <button
                className="delete-button"
                onClick={handleDelete}
                disabled={isDeleting}
            >

                {isDeleting
                    ? "Deleting..."
                    : "🗑️ Delete Event"}

            </button>

        </article>
    );
}

export default EventCard;