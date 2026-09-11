# Smart-AI-Enabled-Personal-Task-Manger-and-Goal-Tracker-
Task Bloom is a personalized task and goal management app built with React. It helps users create goals, organize daily tasks, track progress, and stay consistent with their plans using AI-powered task generation.
# 🌸 Task Bloom

**Task Bloom** is a personalized task and goal management web application designed to help users organize their daily activities, set meaningful goals, and track their progress.

The application allows users to create and manage goals, break goals into smaller tasks, plan their day, track completed tasks, and manage their account securely. It also includes an **AI-powered task planning feature** that generates practical tasks based on the user's goal, available time, duration, and difficulty level.

### ✨ Key Features

* 🔐 User registration and login
* 🔑 Forgot password and security-question verification
* 👤 Account management and profile settings
* 🎯 Create and manage personal goals
* 📝 Create, edit, delete, and complete tasks
* 📅 Plan tasks for specific days
* 📊 Track task and goal progress
* 🤖 AI-generated task plans using Groq
* 💾 Persistent data storage using JSON Server
* 📱 Responsive interface for desktop and mobile devices
* 🌷 Personalized and visually friendly task-management experience

### 🛠️ Technologies Used

* **React.js** — Frontend
* **React Router** — Application routing
* **Tailwind CSS** — UI styling
* **Redux Toolkit** — State management
* **Lucide React** — Icons
* **JSON Server** — Database/API for users, goals, and tasks
* **Node.js & Express.js** — Backend API
* **Groq API** — AI-powered task generation

### 🏗️ Architecture

The project separates the frontend, backend, and database services:

```text
React Frontend
      │
      ├── Express Backend ──→ Groq API
      │
      └── JSON Server ──────→ Users / Goals / Tasks
```

The Groq API key is kept securely on the backend rather than exposed in the React frontend.

### 🎯 Project Goal

Task Bloom aims to make goal management more structured and motivating by turning larger goals into manageable daily tasks, helping users stay consistent and make measurable progress toward what they want to achieve.
