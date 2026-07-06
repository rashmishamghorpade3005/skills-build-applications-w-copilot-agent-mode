import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

type LeaderboardEntry = {
  _id?: string;
  user: string;
  rank: number;
  totalPoints: number;
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<LeaderboardEntry[]>('leaderboard')
      .then((data) => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <div className="alert alert-secondary">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id ?? `${entry.user}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.user}</td>
                  <td>{entry.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
