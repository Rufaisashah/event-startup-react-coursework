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

  const filteredAndSortedEvents = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "price":
        return a.price - b.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h1 className="event-list-title">Upcoming Events</h1>

        <div className="event-list-controls">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="control-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="date">Sort by date</option>
            <option value="price">Sort by price</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
      </div>

      {filteredAndSortedEvents.length === 0 ? (
        <p className="event-list-empty">
          No {filterCategory === "all" ? "" : filterCategory} events found.
        </p>
      ) : (
        <div className="event-list">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
