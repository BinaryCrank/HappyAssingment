# Horizon — Customer Support CRM Ticketing System

A premium, full-stack CRM Ticketing System built for customer support teams to manage, search, and track customer issues effortlessly. This application features a high-performance **FastAPI** backend and an extremely sleek, responsive, dark-mode **React** frontend.

---

## 🌟 Key Features

*   **Premium Dark UI/UX:** Styled using custom CSS variables and Tailwind CSS, featuring subtle glassmorphism, responsive navigation, custom scrollbars, and dynamic state styling.
*   **Create Tickets:** Multi-column validation form allowing customers to submit issues with instant unique ticketing ID assignment.
*   **Interactive Dashboard:** View all tickets inside a responsive grid with status indicators.
*   **Debounced Live Search:** Fast real-time ticket search across subjects, descriptions, or IDs that automatically debounces keystrokes to minimize backend load.
*   **State-based Tab Filtering:** Effortlessly filter tickets instantly between **All**, **Open**, **In Progress**, and **Closed** states.
*   **Ticket Timeline & Internal Notes:** A complete detail view including ticket metadata, status resolution actions, and an **activity timeline** for adding unlimited internal logs (One-to-Many relationship).

---

## 🛠️ Tech Stack

### Backend
*   **Core Framework:** Python 3.10+, FastAPI
*   **Database (SQL):** SQLite (Local file-based `crm.db`)
*   **ORM:** SQLAlchemy (Relational models mapping and session management)
*   **Server:** Uvicorn (ASGI web server)

### Frontend
*   **Framework:** React 18 (Vite-powered for instant HMR)
*   **Styling:** Tailwind CSS, Custom CSS Variables (Glassmorphic theme)
*   **Icons:** Lucide React
*   **Routing:** React Router v6

---

## 📊 Database Architecture

The SQL database contains two core tables mapped using a relational **One-to-Many** design:

| Table | Description |
|-------|-------------|
| `tickets` | Stores customer support tickets with unique IDs, status, and timestamps |
| `notes` | Stores internal timeline notes linked to a ticket via Foreign Key |

A single ticket can have **many** notes — `TICKETS ||--o{ NOTES`.

---

## 🚀 Running Locally

### Prerequisite Checklist
*   Python 3.10+ installed
*   Node.js 18+ installed

---

### Step 1: Run the Backend Server

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# OR: venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

---

### Step 2: Run the Frontend Server

```bash
cd frontend
npm install
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## ☁️ Deployment

### Backend (Railway or Render)
| Setting | Value |
|---------|-------|
| Environment | Python |
| Root Directory | `backend` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |

### Frontend (Vercel)
| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Root Directory | `frontend` |
| Env Variable | `VITE_API_URL` = your deployed backend URL |
