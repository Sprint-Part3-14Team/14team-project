import React from 'react';

import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-full overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
