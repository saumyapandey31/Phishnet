PhishNet: Real-Time URL Phishing Detection System
PhishNet is a full-stack web application designed to detect phishing URLs, including zero-day threats, using a combination of machine learning models and heuristic analysis. The system provides real-time feedback to users, explaining how the URL was analyzed, the risk level, and if a zero-day pattern was detected.

Features
ML-Based Detection using trained models on phishing datasets
Zero-Day Detection via predictive behavior modeling
Confidence scores and detection sources
Fallback heuristic engine (if ML model is unavailable)
Responsive React frontend UI
Scan history (local browser storage)
No external API needed – all analysis is done locally

Project Structure

graphql
Copy
Edit
Phishnet-CSAY/
├── dist/                      # Production build output (auto-generated)
├── node_modules/              # Dependencies (auto-generated)
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AuthPage.tsx
│   │   ├── MyReports.tsx
│   │   ├── ReportPhishing.tsx
│   │   ├── SecurityGuide.tsx
│   │   ├── SecurityQuiz.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ThreatDashboard.tsx
│   │   ├── TrackReport.tsx
│   │   └── URLScanner.tsx     # ⚠️ Main component for scanning URLs
│   ├── App.tsx                # Root component
│   ├── index.css              # Global styles
│   ├── main.tsx               # Entry point
│   ├── mockData.ts            # Sample/mock data for testing
│   ├── supabaseClient.ts      # Supabase config if used for backend
│   ├── types.ts               # TypeScript type definitions
│   └── vite-env.d.ts          # Vite environment type declarations
├── .gitignore
├── index.html                 # HTML template used by Vite
├── package.json
├── package-lock.json
├── tailwind.config.js        # Tailwind theme configuration
├── vite.config.ts            # Vite config file
├── tsconfig.json             # TypeScript compiler options
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js          # Linting rules
├── postcss.config.js         # PostCSS plugins

 How It Works
User Inputs a URL in the frontend.

Frontend calls /api/check-url on the Flask backend.

Backend:

Runs the ML model on the URL

Determines risk level (Safe, Suspicious, Dangerous)

Detects if it is a zero-day (i.e., unseen in known databases)

Returns full analysis: risk, threats, ML model info, etc.

Frontend displays detailed analysis including:

Threats detected

Model used

Zero-day status

Recommendations

 Zero-Day Detection Explained
A zero-day phishing attack is a new or previously unseen phishing URL that is not yet reported in any threat databases. PhishNet flags these based on:
Novel domain patterns
ML confidence score
Absence in known lists
Suspicious character patterns



 Tech Stack
Layer	Tools
Frontend	React, TypeScript, Tailwind CSS
Backend	Python, Flask
ML Model	Scikit-learn (Random Forest, etc.)
Storage	LocalStorage for scan history

 Setup Instructions
 Prerequisites
Python 3.9+

Node.js & npm

