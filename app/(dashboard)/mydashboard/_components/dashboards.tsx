import getFetcher from '@/lib/api/getFetcher';
import { Dashboard } from '@/types/dashboard';

export default async function DashBoards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '6',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards } = data;

  return (
    <section>
      <ul className="">
        {dashboards.map((dashboard: Dashboard) => (
          <li>
            <p>{dashboard.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
