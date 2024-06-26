export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
