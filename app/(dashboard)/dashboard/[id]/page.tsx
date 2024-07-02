import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { CardData, ColumnData } from '@/types/card';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import ToDoCard from '../../_components/todo-card';
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
    <div className="border-gray-300 px-[15px] py-3 md:p-5 xl:border-l xl:pt-[68px]">
      {/* TODO - href 설정할 것 #!는 eslint 우회를 위한 임시 코드입니다. */}
      <Link
        href="#!"
        className="flex h-[60px] items-center justify-center gap-x-3 rounded-lg border border-gray-300 bg-white py-6 font-bold xl:w-[354px]"
      >
        새로운 컬럼 추가하기
        <div className="relative size-5 md:size-[22px]">
          <Image
            src="/icons/icon_add_column.svg"
            alt="새로운 컬럼 추가하기"
            fill
            sizes="100vw"
          />
        </div>
      </Link>
    </div>
  );
}

async function Column({ data }: { data: ColumnData }) {
  const { cards } = await getCards(data.id);
  return (
    <div className="min-h-full border-b border-gray-300 p-5 xl:min-w-[354px] xl:border-b-0 xl:border-l">
      <div className="flex items-center justify-between xl:mb-[25px] xl:mt-[2px]">
        <div className="flex items-center gap-x-2">
          <div className="size-2 rounded-full bg-violet-primary" />
          <div className="flex items-center gap-x-3">
            <p>{data.title}</p>
            <div className="flex size-5 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-500">
              <p>{Object.keys(cards).length}</p>
            </div>
          </div>
        </div>
        <div className="relative size-[22px] md:size-6">
          <Image src="/icons/setting_icon.svg" alt="설정" fill />
        </div>
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
