export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
