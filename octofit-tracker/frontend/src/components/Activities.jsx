import { useApiCollection } from '../api.js'

function Activities() {
  const { records, loading, error } = useApiCollection('activities')

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Training log</p><h1>Recent activities</h1></div>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Activity</th><th>Athlete</th><th>Team</th><th>Duration</th><th>Calories</th></tr></thead><tbody>{records.map((activity) => <tr key={activity._id}><td><strong>{activity.activityType}</strong><br /><small>{new Date(activity.activityDate).toLocaleDateString()}</small></td><td>{activity.user?.displayName ?? 'Unassigned'}</td><td>{activity.team?.name ?? 'Unassigned'}</td><td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Activities