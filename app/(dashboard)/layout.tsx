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
      <div className="h-screen w-full overflow-auto bg-gray-100">
        <Navbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
