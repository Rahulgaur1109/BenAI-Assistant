'use client';

import { useState, useMemo } from 'react';
import Skeleton from '@/components/Skeleton';
import FloatingActionButton from '@/components/FloatingActionButton';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const departments = useMemo(() => {
    const depts = new Set(initialTeachers.map(t => t.department));
    return Array.from(depts).sort();
  }, [initialTeachers]);

  const filteredTeachers = useMemo(() => {
    return initialTeachers.filter(t => {
      const matchesSearch = (t.user?.name || t.name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        (t.specialization?.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDept = selectedDepartment === "all" || t.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [initialTeachers, searchQuery, selectedDepartment]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleDepartmentChange = (dept: string) => {
    setIsLoading(true);
    setSelectedDepartment(dept);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-enhanced p-8 text-center animate-slide-in-down glass-primary">
        <h1 className="text-4xl font-bold text-gradient mb-3">👨‍🏫 Faculty Directory</h1>
        <p className="text-gray-300 text-lg blur-in">Explore our {initialTeachers.length}+ dedicated faculty members</p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6 space-y-4 animate-scale-in glass-primary">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative group">
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, specialization..."
              className="input pl-12 w-full btn-micro group-focus-within:shadow-lg group-focus-within:shadow-indigo-500/30"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Department Filter */}
          <select
            className="input btn-micro"
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-400">
          Found <span className="font-semibold text-gradient">{filteredTeachers.length}</span> faculty member{filteredTeachers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton type="card" />
            </div>
          ))
        ) : filteredTeachers.length > 0 ? (
          filteredTeachers.map((t, index) => (
            <div
              key={t.id}
              className="card p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group glass-primary expand-in"
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Avatar Section */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10 group-hover:border-indigo-500/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:animate-glow transition-all">
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
                  <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 group-hover:animate-glow transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.5m0 0H9m11 0v-3.5a3.5 3.5 0 00-7 0V21m0-3.5a3.5 3.5 0 00-7 0V21" />
                  </svg>
                  <div>
                    <div className="text-gray-400 text-xs uppercase tracking-wide">Department</div>
                    <div className="text-gray-200 font-medium">{t.department}</div>
                  </div>
                </div>

                {t.cabin && (
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 group-hover:animate-glow transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 group-hover:animate-glow transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0 group-hover:animate-glow transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0 group-hover:animate-glow transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-indigo-400 font-medium animate-slide-in-down">
                  ✨ More details available
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full card p-12 text-center glass-primary">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35m0 0a7 7 0 10-9.9 0m9.9 9.9L9.9 9.9" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No faculty found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="🔄"
        label="Refresh"
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 800);
        }}
      />
    </div>
  );
}

export default TeachersContent;
