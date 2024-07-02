import React from 'react';

import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="w-full bg-gray-100">
        <Navbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
