export interface Dashboard {
  title: string;
  color: string;
  id: number;
}

export interface DashboardBasic {
  title: string;
  id: number;
}

export interface DashboardDetail extends Dashboard {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
}

export interface Dashboards {
  dashboards: Dashboard[];
}

export interface DashboardResponse {
  dashboards: DashboardDetail[];
  totalCount: number;
  cursorId: number | null;
}
