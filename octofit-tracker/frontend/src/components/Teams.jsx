import { useApiCollection } from '../api.js'

function Teams() {
  const { records, loading, error } = useApiCollection('teams')

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Community</p><h1>Teams</h1></div>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <div className="row g-3">{records.map((team) => <div className="col-md-6 col-xl-4" key={team._id}><article className="stat-card h-100"><p className="eyebrow">{team.city}</p><h2>{team.name}</h2><p>{team.mascot}</p><strong>{team.memberCount} members</strong></article></div>)}</div>}
    </section>
  )
}

export default Teams