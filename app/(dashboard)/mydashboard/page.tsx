import DashBoards from './_components/dashboards';
import Invitations from './_components/invitations';

export default function MyDashboard() {
  return (
    <div className="md:w-[calc(100vw-160px)] xl:w-[calc(100vw-300px)]">
      <main className="h-[calc(100vh-60px)] w-full overflow-auto p-6 md:h-[calc(100vh-70px)] md:p-10">
        <DashBoards />
        <Invitations />
      </main>
    </div>
  );
}
