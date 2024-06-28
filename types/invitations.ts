import { DashboardBasic } from './dashboard';

export interface Participant {
  id: number;
  email: string;
  nickname: string;
}

export type Inviter = Participant;
export type Invitee = Participant;

export interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: DashboardBasic;
  invitee: Invitee;
  inviteAccepted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invitations {
  invitations: Invitation[];
  cursorId: null | number;
}
