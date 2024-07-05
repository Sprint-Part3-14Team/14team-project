export interface ToDoCardValue {
  assigneeUserId?: number | null;
  title: string;
  description: string;
  dueDate?: string;
  imageUrl?: any;
}

// TODO - imageUrl 타입 any 변경

export interface PostCardValue {
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  assigneeUserId?: number;
  tags?: string[];
  dueDate?: string;
  imageUrl?: any;
}
