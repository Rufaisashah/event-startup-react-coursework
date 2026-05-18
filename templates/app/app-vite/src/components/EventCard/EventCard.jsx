import { Link } from "react-router-dom";

const categoryColors = {
  Conference: "bg-blue-100 text-blue-700",
  Workshop: "bg-green-100 text-green-700",
  Hackathon: "bg-purple-100 text-purple-700",
  Meetup: "bg-orange-100 text-orange-700",
  Bootcamp: "bg-red-100 text-red-700",
};

export default function EventCard({ event }) {
  const {
    id,
    name,
    date,
    time,
    venue,
    city,
    category,
    price,
    ticketsAvailable,
  } = event;

  const isSoldOut = ticketsAvailable === 0;
  const isFree = price === 0;
  const categoryColor = categoryColors[category] || "bg-gray-100 text-gray-700";

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 
                        p-6 flex flex-col gap-4 shadow-sm
                        hover:shadow-xl hover:-translate-y-1 
                        transition-all duration-300 cursor-pointer">

      {/* Category badge */}
      <span className={`self-start text-xs font-bold uppercase 
                        tracking-wider px-3 py-1 rounded-full ${categoryColor}`}>
        {category}
      </span>

      {/* Event name */}
      <h2 className="text-lg font-bold text-gray-900 leading-snug 
                     group-hover:text-indigo-600 transition-colors duration-200">
        {name}
      </h2>

      {/* Meta info */}
      <div className="flex flex-col gap-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{date} at {time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{venue}, {city}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold text-gray-900">
            {isFree ? "Free" : `€${price}`}
          </span>
          <span className={`text-xs font-medium ${
            isSoldOut ? "text-red-500" : "text-green-600"
          }`}>
            {isSoldOut ? "Sold out" : `${ticketsAvailable} tickets left`}
          </span>
        </div>

        <Link
          to={`/events/${id}`}
          className="bg-gray-900 hover:bg-gray-700 text-white 
                     px-4 py-2 rounded-xl text-sm font-semibold
                     transition-all duration-200 hover:shadow-md"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}