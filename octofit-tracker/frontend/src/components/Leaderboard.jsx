import { useApiCollection } from '../api.js'

function Leaderboard() {
  const { records, loading, error } = useApiCollection('leaderboard')

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1></div>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <div className="row g-3">{records.map((entry) => <div className="col-md-6 col-xl-4" key={entry._id}><article className="stat-card h-100"><span className="rank">#{entry.rank}</span><h2>{entry.user?.displayName ?? 'Athlete'}</h2><p className="text-secondary mb-3">{entry.team?.name ?? 'No team'}</p><strong className="points">{entry.points.toLocaleString()} pts</strong><p className="mb-0 mt-2">{entry.weeklyMinutes} active minutes</p></article></div>)}</div>}
    </section>
  )
}

export default Leaderboard