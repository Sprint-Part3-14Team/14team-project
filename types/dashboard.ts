export interface Dashboard {
  title: 'string';
  id: number;
}

export interface DashboardDetail extends Dashboard {
  color: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
}

export interface Dashboards {
  dashboards: Dashboard[];
}
