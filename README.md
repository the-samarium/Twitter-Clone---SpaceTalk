# SpaceTalk - Social Media Platform

A full-stack social media application with a Twitter-like interface, built with FastAPI (backend) and React (frontend).

## Features

- **Post Creation**: Create and share posts with a 280-character limit
- **Real-time Timestamps**: Posts and comments display actual creation times
- **Comment System**: Reply to posts with threaded comments
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, Twitter-inspired interface with smooth animations

## Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLite** - Lightweight database with async support (aiosqlite)
- **Pydantic** - Data validation using Python type annotations
- **SQLAlchemy** - SQL toolkit and ORM

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## Project Structure

```
FASTapi/
├── EXAMPLE/                 # Backend (FastAPI)
│   ├── database/           # Database configuration
│   │   ├── db_config.py    # Database schema and connection
│   │   ├── asyncdb.py      # Async database utilities
│   │   └── db.py           # Database utilities
│   ├── models/             # Pydantic models
│   │   └── model.py        # Post and Comment models
│   ├── router/             # API routes
│   │   └── post.py         # Post and comment endpoints
│   ├── tests/              # Backend tests
│   ├── config.py           # Configuration
│   └── main.py             # FastAPI app entry point
└── frontend/               # Frontend (React)
    ├── src/
    │   ├── components/     # React components
    │   │   ├── PostCard.jsx        # Individual post display
    │   │   ├── CommentSection.jsx  # Comment thread
    │   │   ├── PostComposer.jsx    # Post creation form
    │   │   ├── LeftSidebar.jsx    # Navigation sidebar
    │   │   ├── RightSidebar.jsx   # Discovery sidebar
    │   │   └── FeedHeader.jsx     # Sticky header
    │   ├── App.jsx         # Main app component
    │   ├── main.jsx        # Entry point
    │   └── index.css       # Global styles
    ├── index.html          # HTML template
    └── package.json        # Dependencies
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- uv (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd EXAMPLE
```

2. Install dependencies using uv:
```bash
uv sync
```

3. Start the FastAPI development server:
```bash
uv run fastapi dev .\main.py
```

The backend will run on `http://127.0.0.1:8000`

API documentation available at: `http://127.0.0.1:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the Vite development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Posts
- `GET /posts` - Retrieve all posts (with timestamps)
- `POST /post` - Create a new post
  - Body: `{"body": "Your post content"}`

### Comments
- `GET /comments?post_id={id}` - Retrieve comments for a specific post
- `POST /comment` - Create a new comment
  - Body: `{"post_id": 1, "body": "Your comment"}`

### Root
- `GET /` - Health check endpoint

## Database Schema

### Posts Table
- `id` (Integer, Primary Key, Auto-increment)
- `body` (String, Not Null)
- `created_at` (String, Auto-populated timestamp)

### Comments Table
- `cid` (Integer, Primary Key, Auto-increment)
- `post_id` (Integer, Not Null, Foreign Key)
- `body` (String, Not Null)
- `created_at` (String, Auto-populated timestamp)

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Create posts using the composer at the top
4. Click on posts to view and add comments
5. Toggle dark/light mode using the sidebar button


*This project was a fastapi practice project, so i have vibe coded the frontend part of it. Backend and db integration was the main focus, and its done by me.*

