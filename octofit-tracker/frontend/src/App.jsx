import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  ['activities', 'Activities'],
  ['leaderboard', 'Leaderboard'],
  ['teams', 'Teams'],
  ['users', 'Users'],
  ['workouts', 'Workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="border-bottom bg-white">
        <div className="container py-3 d-flex flex-column flex-lg-row align-items-lg-center gap-3">
          <NavLink className="brand d-flex align-items-center gap-2 text-decoration-none" to="/activities">
            <img src={logo} alt="OctoFit" width="42" height="42" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <nav className="nav nav-pills ms-lg-auto gap-1" aria-label="Primary navigation">
            {navigation.map(([path, label]) => (
              <NavLink key={path} className="nav-link" to={`/${path}`}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
