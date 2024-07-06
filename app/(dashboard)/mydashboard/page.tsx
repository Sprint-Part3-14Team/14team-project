import DashBoards from './_components/dashboards';
import Invitations from './_components/invitations';

export default function MyDashboard() {
  return (
    <div className="w-full overflow-auto bg-secondary-foreground">
      <main className="h-[calc(100vh-60px)] max-w-[1022px] p-6 md:h-[calc(100vh-70px)] md:p-10">
        <DashBoards />
        <Invitations />
      </main>
    </div>
  );
}
