'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const stats = [
    {
      value: '100+',
      label: 'Faculty Members',
      icon: (
        <svg className="w-10 h-10 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14c3.866 0 7 2.239 7 5v1H5v-1c0-2.761 3.134-5 7-5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      )
    },
    {
      value: '18',
      label: 'Hostel Blocks',
      icon: (
        <svg className="w-10 h-10 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10z" />
        </svg>
      )
    },
    {
      value: '24/7',
      label: 'AI Support',
      icon: (
        <svg className="w-10 h-10 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 3h4.5l.75 2.25h2.25A2.25 2.25 0 0119.5 7.5v7.5a2.25 2.25 0 01-2.25 2.25h-1.5L12 21l-3.75-3.75h-1.5A2.25 2.25 0 014.5 15V7.5a2.25 2.25 0 012.25-2.25H9L9.75 3zM9 10.5h6M9 13.5h4.5" />
        </svg>
      )
    },
    {
      value: '50+',
      label: 'Campus Events',
      icon: (
        <svg className="w-10 h-10 mx-auto text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 3v2m8-2v2M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Animated Welcome Section */}
      <div className="card-enhanced p-8 sm:p-12 text-center animate-slide-in-down">
        <div className="mb-6 inline-block">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl animate-float">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3v-3m12 3v-3" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4">
          Welcome to BenAI
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Your intelligent assistant for Bennett University. Get instant answers about professors, campus locations, events, and academic schedules.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => router.push('/chat')} className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            Start Chatting
          </button>
          <button onClick={() => router.push('/teachers')} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            Browse Faculty
          </button>
        </div>
      </div>

      {/* Main Features Grid with staggered animation */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
          </svg>
          Features & Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              title: "AI Assistant",
              description: "Chat with our intelligent assistant to get instant answers about professors, cabin locations, office hours, campus facilities, and academic information.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4H6a2 2 0 01-2-2V6z" />
                </svg>
              ),
              href: "/chat",
              variant: "enhanced",
              badge: "New"
            },
            {
              title: "Faculty Directory",
              description: "Browse 100+ professors with detailed information including cabin locations, phone numbers, office hours, class schedules, and specializations.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" />
                </svg>
              ),
              href: "/teachers",
              count: 100
            },
            {
              title: "Campus Map",
              description: "Explore interactive campus map with all blocks, hostels, food spots, sports facilities, and services. Find exact locations and directions.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-6-3V4l6 3m0 13l6-3m-6 3V7m6 10l6 3V7l-6-3m0 13V4" />
                </svg>
              ),
              href: "/campus-map",
              badge: "Live"
            },
            {
              title: "Academic Calendar",
              description: "View exam schedules, holidays, registration dates, withdrawal deadlines, and important academic events for the semester.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v2m8-2v2M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
                </svg>
              ),
              href: "/events"
            },
            {
              title: "Quick Links",
              description: "Access important university resources, portals, and services. Student services, library, DSA office, and more.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0L6 12.343a4 4 0 005.657 5.657l2.121-2.121m-3.606-7.778l2.121-2.121a4 4 0 015.657 5.657l-2.121 2.121" />
                </svg>
              ),
              onClick: () => alert('Quick links feature coming soon!')
            },
            {
              title: "Support & Help",
              description: "Need help? Contact student affairs, security, medical center, or wardens. Emergency contacts and campus assistance.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636A9 9 0 115.636 18.364 9 9 0 0118.364 5.636zM12 8v5m0 3h.01" />
                </svg>
              ),
              onClick: () => alert('Emergency: +91-120-4754007 (Security)\nMedical: +91-120-4754006')
            }
          ].map((card, index) => (
            <div key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.href}
                variant={card.variant as any}
                badge={card.badge}
                count={card.count}
                onClick={card.onClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with counter animation */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7" />
          </svg>
          By The Numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="card p-6 sm:p-8 text-center transform transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-slide-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card-enhanced p-8 sm:p-12 animate-scale-in">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Get Started Now</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Experience the power of AI-assisted university navigation. Ask any question about campus, faculty, or events.
            </p>
          </div>
          <button 
            onClick={() => router.push('/chat')}
            className="btn-primary px-8 py-3 whitespace-nowrap text-base font-medium hover:scale-110 transition-transform"
          >
            Launch Chat →
          </button>
        </div>
      </div>
    </div>
  );
}

