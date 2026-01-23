import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "BenAI - Bennett University AI Assistant",
  description: "Your intelligent assistant for Bennett University information, faculty directory, campus map, and academic calendar"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
          {/* Enhanced Header with Glassmorphism */}
          <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl bg-gradient-to-b from-black/60 to-black/20 shadow-2xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3 group flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-lg sm:text-xl font-bold gradient-text">BenAI</div>
                    <div className="text-xs text-gray-400">Bennett University</div>
                  </div>
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                  {[
                    { href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
                    { href: "/chat", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", label: "Chat" },
                    { href: "/teachers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Faculty" },
                    { href: "/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Events" }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <svg className="w-4 h-4 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-3 ml-auto">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    B
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-6 sm:py-10">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="border-t border-white/10 mt-auto backdrop-blur-xl bg-gradient-to-t from-black/60 to-black/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <div className="animate-slide-in-up" style={{ animationDelay: '0s' }}>
                  <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    BenAI
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    AI-powered assistant helping Bennett University students and faculty access information instantly.
                  </p>
                </div>
                <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Features</h3>
                  <div className="space-y-2 text-sm">
                    <Link href="/dashboard" className="text-gray-400 hover:text-indigo-400 transition-colors block">📊 Dashboard</Link>
                    <Link href="/chat" className="text-gray-400 hover:text-indigo-400 transition-colors block">💬 AI Chat</Link>
                    <Link href="/teachers" className="text-gray-400 hover:text-indigo-400 transition-colors block">👨‍🏫 Faculty</Link>
                    <Link href="/events" className="text-gray-400 hover:text-indigo-400 transition-colors block">📅 Events</Link>
                  </div>
                </div>
                <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Support</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p className="flex items-center gap-2"><span className="text-indigo-400">🔒</span> Security: +91-120-4754007</p>
                    <p className="flex items-center gap-2"><span className="text-red-400">🏥</span> Medical: +91-120-4754006</p>
                    <p className="flex items-center gap-2"><span className="text-blue-400">📞</span> Admin: +91-120-4754000</p>
                  </div>
                </div>
                <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Stay Connected</h3>
                  <p className="text-gray-400 text-sm mb-3">Get instant notifications about university events</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Your email" className="input px-3 py-2 text-sm flex-1" />
                    <button className="btn-primary px-3 py-2 text-sm">→</button>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center text-gray-500 text-xs sm:text-sm">
                <p>© 2025 BenAI. Powered by AI | Bennett University</p>
                <p className="mt-2 text-gray-600">Made with 💜 for the BenAI community</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

