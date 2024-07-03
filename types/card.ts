export interface CardData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string | null;
  assignee: Assignee;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignee {
  profileImageUrl: string | null;
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
