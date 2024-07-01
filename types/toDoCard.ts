export interface toDoCardValue {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}
