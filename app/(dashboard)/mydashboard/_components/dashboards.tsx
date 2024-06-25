import getFetcher from '@/lib/api/getFetcher';
import { Dashboard } from '@/types/dashboard';

export default async function DashBoards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '8',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards } = data;

  return (
    <section>
      <ul className="grid">
        {dashboards.map((dashboard: Dashboard) => (
          <li>
            <p>{dashboard.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
