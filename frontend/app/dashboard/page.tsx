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
    { value: '100+', label: 'Faculty Members', icon: '👨‍🏫' },
    { value: '18', label: 'Hostel Blocks', icon: '🏠' },
    { value: '24/7', label: 'AI Support', icon: '🤖' },
    { value: '50+', label: 'Campus Events', icon: '🎉' }
  ];

  return (
    <div className="space-y-8">
      {/* Animated Welcome Section */}
      <div className="card-enhanced p-8 sm:p-12 text-center animate-slide-in-down">
        <div className="mb-6 inline-block">
          <div className="text-5xl sm:text-6xl animate-float">🎓</div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4">
          Welcome to BenAI
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Your intelligent assistant for Bennett University. Get instant answers about professors, campus locations, events, and academic schedules.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => router.push('/chat')} className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            ✨ Start Chatting
          </button>
          <button onClick={() => router.push('/teachers')} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
            👨‍🏫 Browse Faculty
          </button>
        </div>
      </div>

      {/* Main Features Grid with staggered animation */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-3xl">✨</span>
          Features & Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              title: "AI Assistant",
              description: "Chat with our intelligent assistant to get instant answers about professors, cabin locations, office hours, campus facilities, and academic information.",
              icon: "💬",
              href: "/chat",
              variant: "enhanced",
              badge: "New"
            },
            {
              title: "Faculty Directory",
              description: "Browse 100+ professors with detailed information including cabin locations, phone numbers, office hours, class schedules, and specializations.",
              icon: "👨‍🏫",
              href: "/teachers",
              count: 100
            },
            {
              title: "Campus Map",
              description: "Explore interactive campus map with all blocks, hostels, food spots, sports facilities, and services. Find exact locations and directions.",
              icon: "🗺️",
              href: "/campus-map",
              badge: "Coming Soon"
            },
            {
              title: "Academic Calendar",
              description: "View exam schedules, holidays, registration dates, withdrawal deadlines, and important academic events for the semester.",
              icon: "📅",
              href: "/events"
            },
            {
              title: "Quick Links",
              description: "Access important university resources, portals, and services. Student services, library, DSA office, and more.",
              icon: "🔗",
              onClick: () => alert('Quick links feature coming soon!')
            },
            {
              title: "Support & Help",
              description: "Need help? Contact student affairs, security, medical center, or wardens. Emergency contacts and campus assistance.",
              icon: "🆘",
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
          <span className="text-3xl">📊</span>
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
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">🚀 Get Started Now</h3>
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

