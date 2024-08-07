import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { CardData, ColumnData } from '@/types/card';
import { cookies } from 'next/headers';

import ToDoCard from '../../_components/todo-card';
import EditColumnButton from './_components/dashboard-column/edit-column-button';
import NewColumnButton from './_components/dashboard-column/new-column-button';
import AddToDoButton from './_components/to-do/add-to-do-button';

async function getCards(columnId: number) {
  const token = cookies().get('token')?.value;

  // TODO - size 무한 스크롤로 설정할 것
  const res = await fetch(
    `${TEAM_BASE_URL}/cards?size=10000&columnId=${columnId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return data;
}

async function getColumns(dashboardId: number) {
  const token = cookies().get('token')?.value;

  const res = await fetch(
    `${TEAM_BASE_URL}/columns?dashboardId=${dashboardId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  return data;
}

function AddColumn() {
  return (
    <div className="border-gray-700 px-[15px] py-3 md:p-5 xl:border-l xl:pt-[68px]">
      <NewColumnButton />
    </div>
  );
}

async function Column({ data }: { data: ColumnData }) {
  const { cards } = await getCards(data.id);
  return (
    <div className="min-h-full border-b border-gray-700 p-5 xl:min-w-[354px] xl:border-b-0 xl:border-l">
      <div className="flex items-center justify-between xl:mb-[25px] xl:mt-[2px]">
        <div className="flex items-center gap-x-2">
          <div className="size-2 rounded-full bg-primary" />
          <div className="flex items-center gap-x-2">
            <p>{data.title}</p>
            <div className="flex size-5 items-center justify-center rounded bg-secondary-foreground px-2 py-1 text-xs font-medium text-primary">
              <p>{Object.keys(cards).length}</p>
            </div>
          </div>
        </div>
        <EditColumnButton columnId={data.id} />
      </div>
      <AddToDoButton columnId={data.id} />
      {cards?.map((card: CardData) => (
        <ToDoCard key={card.id} {...card} columnTitle={data.title} />
      ))}
    </div>
  );
}

export default async function Dashboard({
  params,
}: {
  params: { id: number };
}) {
  const { data } = await getColumns(params.id);
  return (
    <main className="flex min-h-full w-full flex-col xl:flex-row">
      {data?.map((column: ColumnData) => (
        <Column key={column.id} data={column} />
      ))}
      <AddColumn />
    </main>
  );
}
