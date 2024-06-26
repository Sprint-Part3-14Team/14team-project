import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import ToDoCard from '../../_components/todo-card';

export interface CardData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface ColumnData {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: Date;
  updatedAt: Date;
}

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
    <div className="min-h-full border-b border-gray-300 p-5 xl:border-b-0 xl:border-l">
      <p>{data.title}</p>
      {cards?.map((card: CardData) => <ToDoCard key={card.id} {...card} />)}
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
