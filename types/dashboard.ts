export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  createdByMe: boolean;
}

export interface Dashboards {
  dashboards: Dashboard[];
}
