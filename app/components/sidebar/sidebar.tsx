import SidebarButton from './sidebar-button';
import SidebarDashboard from './sidebar-dashboard';

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[90px] flex-shrink-0 flex-col overflow-auto border-r border-gray-300">
      <div className="mt-[60px] flex flex-col items-center justify-center md:mt-[70px]">
        <SidebarButton />
        <SidebarDashboard />
      </div>
    </aside>
  );
}
