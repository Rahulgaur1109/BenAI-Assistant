'use client';

import { useState, useEffect } from 'react';

interface CampusData {
  blocks?: {
    admin?: any[];
    boysHostels?: any[];
    girlsHostels?: any[];
    faculty?: any[];
    sports?: any[];
    academic?: any[];
  };
  facilities?: {
    mess?: any;
    gyms?: any[];
    sports?: any[];
    food?: any[];
    services?: any[];
    gates?: any[];
    libraries?: any[];
    other?: any[];
  };
}

type UniversityInfoRow = {
  key: string;
  value: CampusData;
};

export default function CampusMapPage() {
  const [campusData, setCampusData] = useState<CampusData>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchCampusMap() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_CORE_SERVICE_URL?.replace(/\/$/, '') || 'http://localhost:3020';
        const res = await fetch(`${baseUrl}/api/university/campusMap`, { cache: 'no-store' });
        const data: UniversityInfoRow | CampusData = await res.json();
        const value = (data as UniversityInfoRow)?.value || data;
        setCampusData((value || {}) as CampusData);
      } catch (error) {
        console.error('Failed to load campus map:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCampusMap();
  }, []);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'hostels', name: 'Hostels' },
    { id: 'academic', name: 'Academic' },
    { id: 'food', name: 'Food & Dining' },
    { id: 'sports', name: 'Sports' },
    { id: 'services', name: 'Services' },
    { id: 'other', name: 'Other' }
  ];

  const getAllLocations = () => {
    const locations: any[] = [];
    
    if (campusData.blocks) {
      if (campusData.blocks.admin) locations.push(...campusData.blocks.admin.map(l => ({ ...l, category: 'other', type: 'Admin Block' })));
      if (campusData.blocks.boysHostels) locations.push(...campusData.blocks.boysHostels.map(l => ({ ...l, category: 'hostels', type: 'Boys Hostel' })));
      if (campusData.blocks.girlsHostels) locations.push(...campusData.blocks.girlsHostels.map(l => ({ ...l, category: 'hostels', type: 'Girls Hostel' })));
      if (campusData.blocks.faculty) locations.push(...campusData.blocks.faculty.map(l => ({ ...l, category: 'other', type: 'Faculty Housing' })));
      if (campusData.blocks.sports) locations.push(...campusData.blocks.sports.map(l => ({ ...l, category: 'sports', type: 'Sports Complex' })));
      if (campusData.blocks.academic) locations.push(...campusData.blocks.academic.map(l => ({ ...l, category: 'academic', type: 'Academic Block' })));
    }
    
    if (campusData.facilities) {
      if (campusData.facilities.mess) locations.push({ ...campusData.facilities.mess, category: 'food', type: 'Mess' });
      if (campusData.facilities.gyms) locations.push(...campusData.facilities.gyms.map(l => ({ ...l, category: 'sports', type: 'Gym' })));
      if (campusData.facilities.sports) locations.push(...campusData.facilities.sports.map(l => ({ ...l, category: 'sports', type: 'Sports Facility' })));
      if (campusData.facilities.food) locations.push(...campusData.facilities.food.map(l => ({ ...l, category: 'food', type: 'Food Outlet' })));
      if (campusData.facilities.services) locations.push(...campusData.facilities.services.map(l => ({ ...l, category: 'services', type: 'Service' })));
      if (campusData.facilities.gates) locations.push(...campusData.facilities.gates.map(l => ({ ...l, category: 'other', type: 'Gate', name: `Gate ${l.number}` })));
      if (campusData.facilities.libraries) locations.push(...campusData.facilities.libraries.map(l => ({ ...l, category: 'academic', type: 'Library' })));
      if (campusData.facilities.other) locations.push(...campusData.facilities.other.map(l => ({ ...l, category: 'other', type: 'Facility' })));
    }
    
    return locations;
  };

  const filteredLocations = getAllLocations().filter(location => {
    const matchesSearch = searchTerm === '' || 
      location.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || location.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading campus map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="card-enhanced p-8 text-center">
        <h1 className="text-4xl font-bold gradient-text mb-3">Campus Map</h1>
        <p className="text-gray-400 text-lg">Explore Bennett University facilities and locations</p>
      </div>

      {/* Search and Filter */}
      <div className="card p-6 space-y-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for locations, facilities, or services..."
            className="input input-with-icon w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all font-medium text-sm ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">18</div>
          <div className="text-gray-400 text-xs">Hostel Blocks</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">6+</div>
          <div className="text-gray-400 text-xs">Food Outlets</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">3</div>
          <div className="text-gray-400 text-xs">Gyms</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">3</div>
          <div className="text-gray-400 text-xs">Entry Gates</div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {filteredLocations.length} {filteredLocations.length === 1 ? 'Location' : 'Locations'} Found
          </h2>
        </div>

        {filteredLocations.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">No locations found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLocations.map((location, index) => (
              <div key={index} className="card p-5 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="badge mb-2">{location.type}</div>
                    <h3 className="text-lg font-bold text-white">{location.name}</h3>
                  </div>
                </div>
                
                {location.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{location.location}</span>
                  </div>
                )}
                
                {location.timings && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{typeof location.timings === 'string' ? location.timings : 'Various timings'}</span>
                  </div>
                )}
                
                {location.contact && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{location.contact}</span>
                  </div>
                )}
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {location.description || location.purpose || 'Campus facility'}
                </p>

                {location.amenities && location.amenities.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Amenities:</div>
                    <div className="flex flex-wrap gap-1">
                      {location.amenities.slice(0, 3).map((amenity: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                          {amenity}
                        </span>
                      ))}
                      {location.amenities.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">
                          +{location.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="card-enhanced p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Emergency Contacts
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Security</div>
            <div className="text-white font-mono">+91-120-4754007</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Medical</div>
            <div className="text-white font-mono">+91-120-4754006</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Chief Warden</div>
            <div className="text-white font-mono">+91-120-4754002</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Administration</div>
            <div className="text-white font-mono">+91-120-4754000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
