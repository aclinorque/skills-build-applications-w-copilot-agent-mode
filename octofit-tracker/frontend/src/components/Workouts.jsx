import { getCollectionUrl, useApiCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : getCollectionUrl('workouts')

function Workouts() {
  const { records, loading, error } = useApiCollection(endpoint)

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Personalized plan</p><h1>Workouts</h1></div>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && <div className="row g-3">{records.map((workout) => <div className="col-md-6 col-xl-4" key={workout._id}><article className="stat-card h-100"><span className="badge text-bg-info text-uppercase">{workout.difficulty}</span><h2 className="mt-3">{workout.title}</h2><p>{workout.focusArea}</p><p><strong>{workout.estimatedMinutes} minutes</strong></p><p className="mb-0 text-secondary">For: {workout.recommendedForGoal}</p></article></div>)}</div>}
    </section>
  )
}

export default Workouts