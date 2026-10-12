export const dynamic = "force-dynamic"; // Real SSR rather than a static HTML build.

type Health = {
  status: string;
  database: string;
  redis: string;
};

export default async function HomePage() {
  let health: Health | null = null;

  try {
    const response = await fetch(`${process.env.INTERNAL_API_URL}/api/health/`, {
      cache: "no-store",
    });
    if (response.ok) {
      health = (await response.json()) as Health;
    }
  } catch {
    // The page stays readable when the backend is temporarily unavailable.
  }

  return (
    <section className="space-y-7">
      <h1 className="text-4xl font-bold">Welcome to Mini Facebook</h1>
      <p className="text-slate-300">
        The foundation for our ft_transcendence social network. User registration,
        posts, friends and chat are not implemented yet.
      </p>
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-3 text-xl font-semibold">System status</h2>
        {health ? (
          <p className="text-green-400">
            Backend: {health.status} · PostgreSQL: {health.database} · Redis:{" "}
            {health.redis}
          </p>
        ) : (
          <p className="text-amber-400">
            Backend is not ready yet. Refresh after a few seconds.
          </p>
        )}
        <p className="mt-3 text-sm text-slate-400">
          API: GET /api/health/ · WebSocket: /ws/ping/
        </p>
      </div>
    </section>
  );
}
