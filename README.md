# CRM Ticketing System

A full-stack Customer Support Ticketing System.

## Tech Stack
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6

## Running Locally

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment: 
   - Mac/Linux: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn main:app --reload`
   - The API will be available at `http://localhost:8000`

### Frontend
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
   - The app will be available at `http://localhost:5173`

## Deployment

### Backend (Railway)
1. Connect your GitHub repository to Railway.
2. Railway will automatically detect the Python environment.
3. Configure the Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel)
1. Import the project to Vercel and set the Root Directory to `frontend`.
2. Framework Preset should be Vite.
3. Add an Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-app-url.up.railway.app/api/tickets`
