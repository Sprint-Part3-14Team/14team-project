import Image from 'next/image';
import Link from 'next/link';

import DashboardCard from '../../_components/dashboard-card';

export interface Cards {
  id: number;
  title: string;
  tags: string[];
  assignee: Assignee;
  imageUrl: string;
  createdAt: Date;
}

export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

// NOTE - 임시 데이터 입니다.
const dummyCardsOne: Cards[] = [
  {
    id: 2,
    title: 'Card 2',
    tags: ['tag3'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User2',
      id: 2,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
    createdAt: new Date(),
  },
  {
    id: 4,
    title: 'Card 4',
    tags: ['tag7', 'tag8', 'tag9'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User4',
      id: 4,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    createdAt: new Date(),
  },
  {
    id: 6,
    title: 'Card 6',
    tags: ['tag11', 'tag12'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User6',
      id: 6,
    },
    imageUrl: '',
    createdAt: new Date(),
  },
  {
    id: 8,
    title: 'Card 8',
    tags: ['tag15', 'tag16'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User8',
      id: 8,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/389.png',
    createdAt: new Date(),
  },
  {
    id: 10,
    title: 'Card 10',
    tags: ['tag19', 'tag20'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User10',
      id: 10,
    },
    imageUrl: '',
    createdAt: new Date(),
  },
];

const dummyCardsTwo: Cards[] = [
  {
    id: 2,
    title: 'Card 2',
    tags: ['tag344', 'tag4124'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User2',
      id: 2,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    createdAt: new Date(),
  },
  {
    id: 6,
    title: 'Card 6',
    tags: ['tag11', 'tag12'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User6',
      id: 6,
    },
    imageUrl: '',
    createdAt: new Date(),
  },
  {
    id: 10,
    title: 'Card 10',
    tags: ['tag19', 'tag20'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User10',
      id: 10,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    createdAt: new Date(),
  },
];

const dummyCardsThree: Cards[] = [
  {
    id: 2,
    title: 'Card 2',
    tags: [
      'tag344',
      'tag4124',
      'tag234236',
      'tag3463575',
      'tag2435246',
      'tag3456345',
      'tag347475467',
      'tag898234',
    ],
    assignee: {
      profileImageUrl: '',
      nickname: 'User2',
      id: 2,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    createdAt: new Date(),
  },
  {
    id: 10,
    title: 'Card 10',
    tags: ['tag19', 'tag20'],
    assignee: {
      profileImageUrl: '',
      nickname: 'User10',
      id: 10,
    },
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    createdAt: new Date(),
  },
];

function AddColumn() {
  return (
    <div className="border-gray-300 px-[15px] py-3 md:p-5 lg:pt-[68px] xl:border-l">
      {/* TODO - href 설정할 것 #!는 eslint 우회를 위한 임시 코드입니다. */}
      <Link
        href="#!"
        className="flex h-[60px] items-center justify-center gap-x-3 rounded-lg border border-gray-300 bg-white py-6 font-bold lg:w-[354px]"
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

function Column({ params, data }: { params: { id: number }; data: Cards[] }) {
  return (
    <div className="border-b border-gray-300 p-5 xl:border-b-0 xl:border-l">
      {/* NOTE - params 테스트 코드입니다. */}
      <p className="text-xl font-bold">params 값입니다 : {params.id}</p>
      {/* NOTE - 임시 데이터 매핑 */}
      {data?.map((card) => <DashboardCard key={card.id} {...card} />)}
    </div>
  );
}

export default function Dashboard({ params }: { params: { id: number } }) {
  return (
    <div className="flex flex-col xl:flex-row">
      <Column params={params} data={dummyCardsOne} />
      <Column params={params} data={dummyCardsTwo} />
      <Column params={params} data={dummyCardsThree} />
      <AddColumn />
    </div>
  );
}
