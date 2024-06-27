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
      <div className="h-[calc(100vh-120px)] overflow-auto md:h-[calc(100vh-130px)] md:w-[calc(100vw-160px)] xl:w-[calc(100vw-300px)]">
        {children}
      </div>
    </>
  );
}
