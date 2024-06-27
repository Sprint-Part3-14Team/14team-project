import DashBoards from './_components/dashboards';
import Invitaions from './_components/invitations';

export default function MyDashboard() {
  return (
    <main className="h-[calc(100vh-60px)] max-w-[1022px] overflow-auto p-6 md:h-[calc(100vh-70px)] md:p-10">
      <DashBoards />
      <Invitaions />
    </main>
  );
}
