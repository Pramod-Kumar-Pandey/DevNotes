# DevNotes 📝

DevNotes is a full-stack, AI-powered developer notes platform that helps developers create, organize, understand, and revise their technical notes with the help of AI.

The application combines traditional note management with Gemini-powered features such as summarization, explanations, key points, important questions, quizzes, and an Ask AI chatbot.

---

## 🚀 Features

### 🔐 Authentication

- User signup and login
- JWT-based authentication
- JWT stored using HttpOnly cookies
- Protected routes
- Logout functionality
- Current-user authentication check
- User-specific notes

### 📝 Notes Management

- Create notes
- View all personal notes
- View individual notes
- Edit notes
- Delete notes
- Categories
- Tags
- Search and filtering
- Responsive note interface

### 🤖 AI-Powered Features

DevNotes integrates the Gemini API to help users understand and revise their technical notes.

#### AI Summary
Generate a concise summary of the selected note.

#### AI Explanation
Get a simple explanation of difficult concepts from the note.

#### Key Points
Extract the most important concepts and takeaways as bullet points.

#### Important Questions
Generate important conceptual and interview-oriented questions based on the note.

#### AI Quiz
Generate a multiple-choice quiz based on the selected note.

- One question at a time
- Four options per question
- Instant answer feedback
- Shows the correct answer when the selected answer is incorrect

#### Ask AI
A floating AI chatbot allows users to ask questions about the current note.

The AI uses the selected note as the primary context and can use general knowledge when the note does not contain enough information.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- CORS

### AI

- Google Gemini API
- `@google/genai`

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │   React Client  │
                    └────────┬────────┘
                             │
                             │ REST API
                             ▼
                    ┌─────────────────┐
                    │ Express Server  │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │   MongoDB     │         │  Gemini API   │
        │   Database    │         │      AI       │
        └───────────────┘         └───────────────┘
