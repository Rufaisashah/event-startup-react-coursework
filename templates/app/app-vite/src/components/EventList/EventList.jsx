import { useState } from "react";
import events from "../../data/events.js";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";

export default function EventList() {
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");
  const categories = ["all", ...new Set(events.map((e) => e.category))];
  const filtered = events.filter((e) =>
    filterCategory === "all" ? true : e.category === filterCategory,
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return new Date(a.date) - new Date(b.date);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="event-list-container">
      <h1>Upcoming Events</h1>
      <div className="event-list">
        {sorted.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
