export interface CommentData {
  cursorId: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
}

export interface Author {
  profileImageUrl: string;
  nickname: string;
  id: number;
}
