import React, { useState } from "react";
import API from "../api/axios";

const EventForm = ({ onEventAdded }) => {

    const [title, setTitle] = useState("");
    const [targetDate, setTargetDate] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "events/",
                {
                    title: title,
                    target_date: targetDate,
                }
            );

            onEventAdded(response.data);

            setTitle("");
            setTargetDate("");

        } catch (error) {

            alert("Could not create event");

        }
    };

    return (
        <form
            className="event-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                placeholder="Event name"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />

            <input
                type="datetime-local"
                value={targetDate}
                onChange={(e) =>
                    setTargetDate(e.target.value)
                }
                required
            />

            <button type="submit">
                Add Event
            </button>

        </form>
    );
};

export default EventForm;