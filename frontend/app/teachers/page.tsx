'use client';

import type React from 'react';
import { useState, useMemo } from 'react';

async function getTeachers() {
  const url = process.env.NEXT_PUBLIC_CORE_SERVICE_URL?.replace(/\/$/, "") || "http://localhost:3001";
  try {
    const res = await fetch(`${url}/api/teachers`, { cache: "no-store" });
    if (!res.ok) return { teachers: [] };
    return res.json();
  } catch {
    return { teachers: [] };
  }
}

interface Teacher {
  id: string;
  user?: { name: string; email: string };
  name: string;
  designation: string;
  department: string;
  specialization?: string;
  cabin?: string;
  phone?: string;
}

async function TeachersContent() {
  const data = await getTeachers();
  const initialTeachers: Teacher[] = data?.teachers || [];

  return (
    <TeachersDisplay initialTeachers={initialTeachers} />
  );
}

function TeachersDisplay({ initialTeachers }: { initialTeachers: Teacher[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleSearch = () => setSearchTerm(searchInput.trim().toLowerCase());
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const departments = useMemo(() => {
    const depts = new Set(initialTeachers.map(t => t.department));
    return Array.from(depts).sort();
  }, [initialTeachers]);

  const filteredTeachers = useMemo(() => {
    const q = searchTerm;
    return initialTeachers.filter(t => {
      if (!q) return selectedDepartment === "all" || t.department === selectedDepartment;
      const haystacks = [
        t.user?.name,
        t.name,
        t.specialization,
        t.department,
        t.cabin,
        t.phone,
        t.user?.email
      ].filter(Boolean).map(v => v!.toLowerCase());
      const matchesSearch = haystacks.some(h => h.includes(q));
      const matchesDept = selectedDepartment === "all" || t.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [initialTeachers, searchTerm, selectedDepartment]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-enhanced p-8 text-center animate-slide-in-down">
        <h1 className="text-4xl font-bold gradient-text mb-3">👨‍🏫 Faculty Directory</h1>
        <p className="text-gray-300 text-lg">Explore our {initialTeachers.length}+ dedicated faculty members</p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6 space-y-4 animate-scale-in">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by name, specialization, cabin, phone, or email"
                className="input pl-12 w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn-primary px-4 whitespace-nowrap"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Department Filter */}
          <select
            className="input"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-400">
          Found <span className="font-semibold text-indigo-400">{filteredTeachers.length}</span> faculty member{filteredTeachers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className="card p-6 transform transition-all duration-300 hover:scale-105 cursor-pointer group"
            onMouseEnter={() => setHoveredId(t.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Avatar Section */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                  {t.user?.name || t.name}
                </h3>
                <p className="text-xs text-indigo-400 font-medium">{t.designation}</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m11 0v-3.5a3.5 3.5 0 00-7 0V21m0-3.5a3.5 3.5 0 00-7 0V21" />
                </svg>
                <div>
                  <div className="text-gray-400 text-xs uppercase tracking-wide">Department</div>
                  <div className="text-gray-200 font-medium">{t.department}</div>
                </div>
              </div>

              {t.cabin && (
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Cabin</div>
                    <div className="text-gray-200 font-medium">{t.cabin}</div>
                  </div>
                </div>
              )}

              {t.phone && (
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Phone</div>
                    <div className="text-gray-200 font-medium">{t.phone}</div>
                  </div>
                </div>
              )}

              {t.user?.email && (
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Email</div>
                    <div className="text-gray-200 font-medium truncate">{t.user.email}</div>
                  </div>
                </div>
              )}

              {t.specialization && (
                <div className="flex items-start gap-2 pt-2">
                  <svg className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Specialization</div>
                    <div className="text-purple-300 text-sm italic">{t.specialization}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Hover Indicator */}
            {hoveredId === t.id && (
              <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-indigo-400 font-medium">
                Click to view more details
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <div className="card p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35m0 0a7 7 0 10-9.9 0m9.9 9.9L9.9 9.9" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No faculty found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default TeachersContent;
