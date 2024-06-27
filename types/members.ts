import { User } from './user';

export interface DashboardMembers extends User {
  isOwner: boolean;
  userId: number;
}
