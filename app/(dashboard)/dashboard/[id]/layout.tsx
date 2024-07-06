import React from 'react';

import DashboardNavbar from './_components/dashboard-navbar/dashboard-navbar';

export default function DashboardIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <>
      <DashboardNavbar id={params.id} />
      {/* NOTE - 사이드바 너비 변경하면 여기 너비도 변경해야 함 */}
      <div className="h-[calc(100vh-120px)] overflow-auto bg-secondary-foreground md:h-[calc(100vh-130px)] md:w-[calc(100vw-90px)] xl:w-[calc(100vw-90px)]">
        {children}
      </div>
    </>
  );
}
