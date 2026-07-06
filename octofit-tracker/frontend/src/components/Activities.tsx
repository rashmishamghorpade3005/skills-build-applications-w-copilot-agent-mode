import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

type Activity = {
  _id?: string;
  user: string;
  type: string;
  duration: number;
  caloriesBurned: number;
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<Activity[]>('activities')
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <div className="alert alert-secondary">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.user}-${activity.type}-${activity.duration}`}>
                  <td>{activity.user}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.caloriesBurned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
