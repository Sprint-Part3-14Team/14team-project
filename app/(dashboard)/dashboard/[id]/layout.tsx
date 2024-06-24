import React from 'react';

import DashboardNavbar from './_components/dashboard-navbar/dashboard-navbar';

export default function DashboardIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
