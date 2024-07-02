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
