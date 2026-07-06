import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container container mt-5 p-4 shadow-sm rounded bg-white">
        <header className="mb-4">
          <h1 className="display-5">OctoFit Tracker</h1>
          <p className="lead">A multi-tier tracker built with React, Express, and MongoDB.</p>
          <div className="alert alert-info" role="alert">
            <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API URLs.
          </div>
          <nav className="nav nav-pills flex-column flex-sm-row gap-2">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
