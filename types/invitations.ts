import { DashboardBasic } from './dashboard';

export interface Participant {
  id: number;
  email: string;
  nickname: string;
}

export interface Invitation {
  id: number;
  inviter: Participant;
  teamId: string;
  dashboard: DashboardBasic;
  invitee: Participant;
  inviteAccepted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invitations {
  invitations: Invitation[];
  cursorId: null | number;
}
