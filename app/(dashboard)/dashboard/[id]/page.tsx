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
const dummyCards: Cards[] = [
  {
    id: 2,
    title: 'Card 2',
    tags: ['tag3', 'tag4'],
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
    tags: ['tag7', 'tag8'],
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

export default function Dashboard({ params }: { params: { id: number } }) {
  return (
    <div className="px-3">
      {/* NOTE - params 테스트 코드입니다. */}
      <p className="text-xl font-bold">params 값입니다 : {params.id}</p>
      {/* NOTE - 임시 데이터 매핑 */}
      {dummyCards?.map((card) => <DashboardCard key={card.id} {...card} />)}
    </div>
  );
}
