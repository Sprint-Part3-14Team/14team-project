import { User } from './user';

export interface DashboardMembers extends User {
  isOwner: boolean;
  userId: number;
}
export interface DashboardMembersResponse {
  members: DashboardMembers[];
  totalCount: number;
}
