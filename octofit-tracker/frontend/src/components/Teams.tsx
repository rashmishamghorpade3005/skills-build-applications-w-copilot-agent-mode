import { useEffect, useState } from 'react';

type Team = {
  _id?: string;
  name: string;
  members: string[];
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiBase = codespaceName && codespaceName !== ''
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : '/api';

    fetch(`${apiBase}/teams/`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data.teams ?? data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <div className="alert alert-secondary">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id ?? team.name} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">Members: {team.members.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
