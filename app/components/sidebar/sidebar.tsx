import SidebarButton from './sidebar-button';
import SidebarDashboard from './sidebar-dashboard';

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[67px] flex-shrink-0 flex-col border-r border-gray-300 md:w-40 xl:w-[300px]">
      <div className="mt-[60px] flex flex-col items-center justify-center md:mx-[14px] md:mt-[70px] xl:items-stretch">
        <div className="mb-[38px] flex items-center justify-between md:mb-[30px] md:w-full">
          <p className="flex hidden text-xs font-bold text-gray-500 md:block">
            Dash Boards
          </p>
          <SidebarButton />
        </div>
        <SidebarDashboard />
      </div>
    </aside>
  );
}
