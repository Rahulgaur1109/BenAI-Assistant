'use client';

import type React from 'react';
import { useState, useMemo } from 'react';

async function getEvents() {
  const url = process.env.NEXT_PUBLIC_CORE_SERVICE_URL?.replace(/\/$/, "") || "http://localhost:3001";
  try {
    const res = await fetch(`${url}/api/events`, { cache: "no-store" });
    if (!res.ok) return { events: [] };
    return res.json();
  } catch {
    return { events: [] };
  }
}

interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  location?: string;
  link?: string;
}

async function EventsContent() {
  const data = await getEvents();
  const initialEvents: Event[] = data?.events || [];

  return (
    <EventsDisplay initialEvents={initialEvents} />
  );
}

function EventsDisplay({ initialEvents }: { initialEvents: Event[] }) {
  const [sortBy, setSortBy] = useState<"upcoming" | "past">("upcoming");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => setSearchTerm(searchInput.trim().toLowerCase());
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const sortedEvents = useMemo(() => {
    const now = new Date();
    const sorted = [...initialEvents].sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    if (sortBy === "upcoming") {
      return sorted.filter(e => new Date(e.startTime) >= now);
    } else {
      return sorted.filter(e => new Date(e.startTime) < now).reverse();
    }
  }, [initialEvents, sortBy]);

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return sortedEvents;
    return sortedEvents.filter((e) => {
      const haystack = [e.title, e.description, e.location]
        .filter(Boolean)
        .map(v => v!.toLowerCase());
      return haystack.some(h => h.includes(searchTerm));
    });
  }, [sortedEvents, searchTerm]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSoon = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const daysUntil = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 3;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-enhanced p-8 text-center animate-slide-in-down">
        <h1 className="text-4xl font-bold gradient-text mb-3">📅 Academic Calendar</h1>
        <p className="text-gray-300 text-lg">Stay updated with university events and important dates</p>
      </div>

      {/* Search + View Toggle */}
      <div className="card p-4 space-y-3 animate-scale-in">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search events by title, description, or location"
                className="input pl-12 w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-primary px-4 whitespace-nowrap" onClick={handleSearch}>Search</button>
            </div>
          </div>

          <div className="flex gap-2 md:w-80">
            <button
              onClick={() => setSortBy("upcoming")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                sortBy === "upcoming"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              Upcoming ({filteredEvents.length})
            </button>
            <button
              onClick={() => setSortBy("past")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                sortBy === "past"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 0l-7 7 7 7" />
              </svg>
              Past Events
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => {
          const isEventToday = isToday(event.startTime);
          const isEventSoon = isSoon(event.startTime);

          return (
            <div
              key={event.id}
              className="group relative animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline connector */}
              {index !== filteredEvents.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-12 bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isEventToday
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 scale-125"
                      : isEventSoon
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 scale-110"
                      : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
                  } group-hover:scale-125`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Event Card */}
                <div className="flex-1 pb-8">
                  <div className="card p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    {/* Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {isEventToday && (
                          <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30 mb-2">
                            🔥 Today
                          </span>
                        )}
                        {!isEventToday && isEventSoon && (
                          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 mb-2">
                            ⏰ Coming Soon
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {event.title}
                    </h3>

                    {/* Date & Time */}
                    <div className="flex flex-wrap gap-3 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{getDayOfWeek(event.startTime)}, {formatDate(event.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{formatTime(event.startTime)}</span>
                      </div>
                    </div>

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                        <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    {event.description && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>
                    )}

                    {/* Link */}
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                      >
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="card p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            {sortBy === "upcoming" ? "No upcoming events" : "No past events"}
          </h3>
          <p className="text-gray-500">Check back soon for more events</p>
        </div>
      )}
    </div>
  );
}

export default EventsContent;
