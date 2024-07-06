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
      <div className="w-full bg-background">
        <Navbar />
        <div className="w-full text-primary-foreground">{children}</div>
      </div>
    </div>
  );
}
