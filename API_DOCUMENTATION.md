# 📡 API Documentation - PlacementAI

This reference manual documents all RESTful endpoints available in the **PlacementAI** backend.

---

## 📌 Endpoint Summary Table

| Endpoint | Method | Description | Content-Type |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register new user account | `application/json` |
| `/api/auth/login` | `POST` | Authenticate user & issue JWT | `application/json` |
| `/api/user/profile` | `GET` / `PUT` | Manage user profile & solved DSA problems | `application/json` |
| `/api/resume-analyze` | `POST` | Process resume file/text with Gemini AI | `multipart/form-data` or `json` |
| `/api/mock-interview` | `POST` | Generate interview questions & evaluate responses | `application/json` |
| `/api/company-prep` | `POST` | Generate company-specific preparation guides | `application/json` |

---

## 🔐 1. Authentication Endpoints

### 1.1 User Registration
`POST /api/auth/register`

#### Request Body
```json
{
  "name": "Monu Gurjar",
  "email": "monu@example.com",
  "password": "SecurePassword123",
  "targetCompany": "Google",
  "targetRole": "Software Engineer"
}
```

#### Response Success (`201 Created`)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Monu Gurjar",
    "email": "monu@example.com",
    "targetCompany": "Google",
    "targetRole": "Software Engineer"
  }
}
```

---

### 1.2 User Login
`POST /api/auth/login`

#### Request Body
```json
{
  "email": "monu@example.com",
  "password": "SecurePassword123"
}
```

#### Response Success (`200 OK`)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Monu Gurjar",
    "email": "monu@example.com"
  }
}
```

---

## 📄 2. AI Resume & ATS Analyzer Endpoint

`POST /api/resume-analyze`

Accepts either a **`multipart/form-data`** upload containing a document file (`.pdf`, `.docx`, `.txt`) OR a **`application/json`** payload containing plain text.

#### Multipart Request (File Upload)
- `file`: Resume document binary (`.pdf`, `.docx`, `.txt`)
- `jobTitle`: `Software Engineer` (optional)
- `company`: `Google` (optional)

#### JSON Request Body
```json
{
  "resumeText": "Monu Gurjar - Full Stack Software Engineer skilled in React, Next.js, Node.js, MongoDB...",
  "jobTitle": "Software Engineer",
  "company": "Google"
}
```

#### Response Success (`200 OK`)
```json
{
  "success": true,
  "fileName": "Resume_Monu.pdf",
  "matchScore": 85,
  "matchedKeywords": ["React", "Next.js", "MongoDB", "Node.js", "TypeScript"],
  "missingKeywords": ["System Design", "GraphQL", "Kubernetes", "gRPC"],
  "suggestedImprovements": [
    "Add quantified metrics to your bullet points (e.g. 'Improved API latency by 35%').",
    "Include a dedicated System Architecture skills section for Google SDE roles."
  ]
}
```

---

## 💬 3. AI Mock Interview Simulator Endpoint

`POST /api/mock-interview`

#### Request Body (Evaluate Response)
```json
{
  "action": "evaluate",
  "question": "Tell me about a time you had a conflict with a teammate.",
  "userAnswer": "During our capstone project, my teammate wanted to use SQL while I preferred MongoDB for rapid iteration. I scheduled a call, benchmarked our schema needs, and we agreed to use MongoDB for unstructured metadata while using SQL for auth.",
  "role": "Software Engineer"
}
```

#### Response Success (`200 OK`)
```json
{
  "success": true,
  "evaluation": {
    "overallScore": 88,
    "technicalAccuracyScore": 90,
    "communicationScore": 85,
    "starFeedback": "Great use of the STAR method. You clearly identified the conflict (Task), your proactive meeting (Action), and the technical consensus (Result).",
    "keyStrengths": ["Proactive communication", "Data-driven decision making"],
    "areasForImprovement": ["Add specific quantitative impact metrics."]
  }
}
```

---

## 🎯 4. Company Preparation Guide Endpoint

`POST /api/company-prep`

#### Request Body
```json
{
  "company": "Google",
  "role": "Software Engineer"
}
```

#### Response Success (`200 OK`)
```json
{
  "success": true,
  "roadmap": {
    "company": "Google",
    "rounds": [
      { "name": "Online Assessment", "duration": "90 mins", "topics": ["Arrays", "Strings", "Trees"] },
      { "name": "Technical Phone Screen", "duration": "45 mins", "topics": ["Data Structures & Algorithms"] },
      { "name": "Onsite Rounds (4x)", "duration": "45 mins each", "topics": ["System Design", "Coding", "Googleness"] }
    ],
    "highYieldTopics": ["Graphs", "Dynamic Programming", "Tries", "System Design"],
    "pastQuestions": [
      "Find Median from Data Stream",
      "Course Schedule II",
      "LRU Cache"
    ]
  }
}
```
