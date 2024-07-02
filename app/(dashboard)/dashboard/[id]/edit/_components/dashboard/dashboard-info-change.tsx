import getFetcher from '@/lib/api/getFetcher';

import SectionTitle from '../section-title';
import DashboardChangeForm from './dashboard-change-form';

interface DashboardInfoChangeProps {
  dashboardId: number;
}

export default async function DashboardInfoChange({
  dashboardId,
}: DashboardInfoChangeProps) {
  const data = await getFetcher(`dashboards/${dashboardId}`);
  const { title, color } = data;

  return (
    <section className="relative w-full rounded-lg bg-white p-5 pt-7 md:h-64 md:p-8 md:pt-11 xl:w-[620px]">
      <SectionTitle sectionTitle={title} />
      <DashboardChangeForm
        dashboardId={dashboardId}
        dashboardTitle={title}
        dashboardColor={color}
      />
    </section>
  );
}
