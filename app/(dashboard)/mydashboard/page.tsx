import DashBoards from './_components/dashboards';
import Invitations from './_components/invitations';

export default function MyDashboard() {
  return (
    <div className="overflow-auto p-6 md:w-[calc(100vw-160px)] md:p-10 xl:w-[calc(100vw-300px)]">
      <main className="h-[calc(100vh-60px)] w-full max-w-[1022px] md:h-[calc(100vh-70px)]">
        <DashBoards />
        <Invitations />
      </main>
    </div>
  );
}
