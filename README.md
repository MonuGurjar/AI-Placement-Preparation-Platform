# 🚀 PlacementAI - AI-Powered Placement Preparation Platform

> A comprehensive, full-stack platform designed to streamline student placement preparation with Gemini 2.5 AI, real-time ATS resume parsing, company roadmaps, interactive mock interviews, and MongoDB persistence.

---

## ✨ Features

- 📄 **AI Resume & ATS Analyzer**: Drag-and-drop file upload support for `.pdf`, `.docx`, and `.txt` files. Uses Gemini AI to calculate role-specific ATS match scores, extract missing keywords, and suggest bullet optimizations.
- 🎯 **Company-Specific Roadmaps**: Tailored recruitment guides for top tech companies (Google, Amazon, Microsoft, Meta, TCS, Uber). Includes selection process rounds, high-yield topics, and past interview questions.
- 💬 **AI Mock Interview Simulator**: Practice technical and behavioral interview questions with instant AI evaluation of your technical accuracy, communication clarity, and STAR framework responses.
- 🧩 **DSA Preparation Tracker**: Interactive problem tracker categorized by pattern (Arrays, Dynamic Programming, Graphs, Two Pointers) with solved toggles, difficulty filters, and bookmarks.
- 🍃 **MongoDB Database Persistence**: Serverless MongoDB connection with Mongoose schemas for user authentication (`bcryptjs`), target configuration, ATS report history, and mock interview logs.
- 📊 **Placement Readiness Analytics**: Track active daily streaks, placement probability metrics, and consolidated competitive programming stats (LeetCode, Codeforces, HackerRank, GFG).
- 🎨 **Dark Glassmorphism UI**: Apple-inspired, accessible dark UI with smooth CSS animations, glassmorphism panels, and mobile-responsive drawer navigation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & React 19
- **AI Integration**: [Google Gemini AI SDK (`@google/genai`)](https://www.npmjs.com/package/@google/genai)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ORM](https://mongoosejs.com/)
- **Document Extractors**: `pdf-parse` (PDF) & `mammoth` (Word .docx)
- **Authentication**: JWT (`jsonwebtoken`) & Password Hashing (`bcryptjs`)
- **Icons & Styling**: `lucide-react`, `framer-motion`, Vanilla CSS Design Tokens

---

## 📂 Project Structure

```text
AI-Placement-Preparation-Platform/
├── src/
│   ├── app/
│   │   ├── api/                      # Next.js Serverless API Routes
│   │   │   ├── auth/                 # Login & Registration APIs
│   │   │   ├── company-prep/         # Gemini Company Guide Generator API
│   │   │   ├── mock-interview/       # Gemini AI Mock Interview API
│   │   │   ├── resume-analyze/       # Document Parser & ATS Evaluator API
│   │   │   └── user/profile/         # User Profile & Solved DSA API
│   │   ├── auth/                     # Sign In & Registration Page
│   │   ├── dashboard/                # Main Application Shell & Navigation
│   │   │   ├── ats/                  # ATS Report History Page
│   │   │   ├── bookmarks/            # Saved Bookmarks & Resources
│   │   │   ├── companies/            # Company Roadmaps Hub
│   │   │   ├── dsa/                  # Interactive DSA Problem Tracker
│   │   │   ├── interviews/           # AI Mock Interview Practice Room
│   │   │   ├── notifications/        # User Alerts & Milestones
│   │   │   ├── platforms/            # Coding Platform Sync
│   │   │   ├── progress/             # Readiness Analytics Page
│   │   │   ├── resume/               # Resume Upload & ATS Analyzer
│   │   │   └── settings/             # User Target & Profile Settings
│   │   ├── globals.css               # Design System Variables & Theme
│   │   ├── page.tsx                  # SaaS Landing Page & Hero Preview
│   │   └── layout.tsx                # Root Application Layout
│   ├── lib/
│   │   ├── mongodb.ts                # Serverless MongoDB Connection Singleton
│   │   └── storage.ts                # Unified Local Storage State Manager
│   └── models/                       # Mongoose Schemas (User, ATSReport, MockInterview)
├── .env.local                        # Local Environment Variables
├── package.json                      # Dependencies & NPM Scripts
└── README.md                         # Project Documentation
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Gemini API Key for AI Features
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Connection URI (Local or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/placement_assistant

# Secret Key for JWT Authentication
JWT_SECRET=super_secret_placement_ai_jwt_key_2026
```

> **Note**: Smart fallback handlers are built in so all features work seamlessly out of the box even before adding your Gemini API key or live database URI!

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MonuGurjar/AI-Placement-Preparation-Platform.git
cd AI-Placement-Preparation-Platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Verification & Health Check

You can verify the TypeScript compilation and production build at any time:

```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
