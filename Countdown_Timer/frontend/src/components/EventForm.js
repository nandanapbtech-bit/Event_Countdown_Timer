import React, { useState } from "react";
import API from "../api/axios";

function EventForm({ onEventAdded }) {

    const [title, setTitle] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!title.trim()) {

            setError(
                "Please enter an event name."
            );

            return;
        }

        if (!targetDate) {

            setError(
                "Please select a date and time."
            );

            return;
        }

        try {

            setLoading(true);

            const response = await API.post(
                "events/",
                {
                    title: title.trim(),
                    target_date: targetDate
                }
            );

            console.log(
                "EVENT CREATED:",
                response.data
            );

            if (onEventAdded) {
                onEventAdded(response.data);
            }

            setTitle("");
            setTargetDate("");

            setSuccess(
                "🎉 Event created successfully!"
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);

        } catch (error) {

            console.error(
                "CREATE EVENT ERROR:",
                error.response?.data || error
            );

            const backendError =
                error.response?.data;

            if (
                backendError?.target_date
            ) {

                setError(
                    Array.isArray(
                        backendError.target_date
                    )
                        ? backendError.target_date[0]
                        : backendError.target_date
                );

            } else if (
                backendError?.title
            ) {

                setError(
                    Array.isArray(
                        backendError.title
                    )
                        ? backendError.title[0]
                        : backendError.title
                );

            } else {

                setError(
                    "Could not create event. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="event-form-wrapper">

            <form
                className="event-form"
                onSubmit={handleSubmit}
            >

                <div className="form-field">

                    <label htmlFor="event-title">
                        📝 Event Name
                    </label>

                    <input
                        id="event-title"
                        type="text"
                        placeholder="e.g. My Birthday 🎂"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        disabled={loading}
                    />

                </div>


                <div className="form-field">

                    <label htmlFor="event-date">
                        📅 Date & Time
                    </label>

                    <input
                        id="event-date"
                        type="datetime-local"
                        value={targetDate}
                        onChange={(e) =>
                            setTargetDate(e.target.value)
                        }
                        disabled={loading}
                    />

                </div>


                <button
                    type="submit"
                    className="add-event-button"
                    disabled={loading}
                >

                    {loading ? (
                        <>
                            <span className="button-spinner"></span>
                            Creating...
                        </>
                    ) : (
                        <>
                            ✨ Add Event
                        </>
                    )}

                </button>

            </form>


            {error && (

                <div className="form-message error-message">
                    ⚠️ {error}
                </div>

            )}


            {success && (

                <div className="form-message success-message">
                    {success}
                </div>

            )}

        </div>
    );
}

export default EventForm;