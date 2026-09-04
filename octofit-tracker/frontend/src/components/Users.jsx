import { getCollectionUrl, useApiCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : getCollectionUrl('users')

function Users() {
  const { records, loading, error } = useApiCollection(endpoint)

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Athletes</p><h1>Members</h1></div>
      {loading && <p>Loading members...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <div className="row g-3">{records.map((user) => <div className="col-md-6 col-xl-4" key={user._id}><article className="stat-card h-100"><h2>{user.displayName}</h2><p className="text-secondary">@{user.username}</p><p><strong>Goal:</strong> {user.fitnessGoal}</p><p className="mb-0"><strong>Favorite:</strong> {user.favoriteActivity}</p></article></div>)}</div>}
    </section>
  )
}

export default Users