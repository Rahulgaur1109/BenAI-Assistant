# 🤖 BenAI – AI Powered Campus Assistant for Bennett University

BenAI is an intelligent campus assistant chatbot designed to help students, freshers, parents, and faculty quickly access information about Bennett University. 

**The Problem:** New students often struggle to find important information about classes, events, faculty, academic dates, and campus facilities. Instead of browsing multiple pages or asking seniors, users can simply chat with BenAI and get instant answers.

**The Solution:** BenAI is a conversational AI that stores all university data in a structured database and uses Gemini 2.5 Flash AI to provide natural, helpful responses in seconds.

---

## ✨ Core Features

### 🤖 **AI-Powered Chat Interface**
- Natural language conversations with Google Gemini 2.5 Flash AI
- Context-aware responses based on Bennett University data
- Quick suggestion buttons for common questions
- Real-time messaging with conversation history
- Answers questions about faculty, events, programs, and facilities

### 👨‍🏫 **Faculty Directory**
- Browse **102+ faculty members** with full details
- Search by: Name, Department, Specialization, Cabin/Office, Phone, Email
- View detailed profiles including contact information and specializations

### 📅 **Academic Calendar**
- Complete **2025-26 academic year** timeline
- **170+ important dates** including exams, registration, holidays
- Filter and search events
- Toggle between upcoming and past events

### 🏫 **University Information**
- **30+ academic programs** across 8 schools
- Fee structures for different programs
- Placement statistics & top recruiters
- Global collaborations
- Campus facilities overview
- Admission guidelines

### 🔐 **User Authentication**
- Secure registration with email
- Password hashing with bcrypt
- JWT-based sessions
- Persistent user sessions

---

## 🛠️ Technology Stack

### **Frontend**
- Next.js 14+ with TypeScript
- Tailwind CSS for styling
- NextAuth.js for authentication
- React Hooks for state management

### **Backend**
- **Core Service:** Express.js + Prisma + SQLite (Port 3020)
- **AI Service:** Express.js + Google Gemini API (Port 3010)

### **Database**
- SQLite (development)
- PostgreSQL/Neon (production)
- Prisma ORM

---

Demo Video Link:- https://drive.google.com/file/d/18sd8GedvI3k5LDHiYNuHhA9SXbZOIJ1G/view?usp=drive_link

Deployed Link:- https://ben-ai-assistant-cmef.vercel.app
