export interface LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  leave: LeaveRequest[];
}

export interface Admin {
  id: number;
  username: string;
  password: string;
  name: string;
}

export interface CompanyData {
  admin: Admin;
  employees: User[];
}
