import React from 'react';

import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* // TODO - Navbar */}
      <Sidebar />
      {/* // TODO - main 스타일 조정 */}
      <main>{children}</main>
    </>
  );
}
