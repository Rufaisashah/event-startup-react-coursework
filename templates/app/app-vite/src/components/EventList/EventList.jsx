import { useState, useEffect } from "react";
import api from "../../api.js";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventList.css";

export default function EventList() {
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  useEffect(() => {
    setLoading(true);
    fetch(api(`/events?name_like=${search}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterCategory]);

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
  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredAndSortedEvents.slice(
    startIndex,
    startIndex + eventsPerPage,
  );

  if (loading) return <p className="status-message">Loading events...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div className="event-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
      </div>
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
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
