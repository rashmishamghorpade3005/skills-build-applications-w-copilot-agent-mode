const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBase = codespaceName && codespaceName !== ''
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api';

export async function fetchApi<T>(path: string): Promise<T> {
  const url = `${apiBase}/${path}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
