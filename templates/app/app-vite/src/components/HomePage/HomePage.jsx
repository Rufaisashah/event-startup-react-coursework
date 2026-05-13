import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">

        {/* Animated badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 
                        px-4 py-2 rounded-full text-sm font-semibold mb-8
                        animate-pulse">
          🎟 Events platform
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
          Discover events{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 
                           bg-clip-text text-transparent">
            happening
          </span>{" "}
          near you
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Conferences, workshops, and hackathons — find your next experience
          and grab your ticket in seconds.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white 
                       px-8 py-4 rounded-xl font-semibold text-lg
                       transition-all duration-200 hover:shadow-lg 
                       hover:-translate-y-0.5 transform"
          >
            Browse events →
          </Link>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-50 text-gray-700 
                       px-8 py-4 rounded-xl font-semibold text-lg
                       border border-gray-200 transition-all duration-200
                       hover:shadow-md hover:-translate-y-0.5 transform"
          >
            Create account
          </Link>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm 
                          border border-gray-100 hover:shadow-md 
                          transition-shadow duration-200">
            <div className="text-3xl font-bold text-indigo-600 mb-1">10+</div>
            <div className="text-gray-500 text-sm">Events available</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm 
                          border border-gray-100 hover:shadow-md 
                          transition-shadow duration-200">
            <div className="text-3xl font-bold text-indigo-600 mb-1">2</div>
            <div className="text-gray-500 text-sm">Cities covered</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm 
                          border border-gray-100 hover:shadow-md 
                          transition-shadow duration-200">
            <div className="text-3xl font-bold text-indigo-600 mb-1">5</div>
            <div className="text-gray-500 text-sm">Categories</div>
          </div>
        </div>
      </div>

    </div>
  );
}