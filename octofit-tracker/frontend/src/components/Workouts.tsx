import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

type Workout = {
  _id?: string;
  name: string;
  goal: string;
  durationMinutes: number;
  difficulty: string;
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Workout[]>('workouts')
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <div className="alert alert-secondary">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id ?? workout.name} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">Goal: {workout.goal}</p>
                  <p className="card-text">Duration: {workout.durationMinutes} min</p>
                  <p className="card-text">Difficulty: {workout.difficulty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
