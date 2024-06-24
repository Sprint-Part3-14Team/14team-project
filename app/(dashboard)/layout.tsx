import React from 'react';

import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
