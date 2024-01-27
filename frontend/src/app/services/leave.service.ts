import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../admin/leaveapproval/Leaverequest.model';


interface  LeaveRequest {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

interface AddUserResponse {
  message: string;
  user: any; // Replace 'any' with the actual type of your user data
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService{
  private baseUrl = 'http://localhost:3000';
  
  submitLeaveRequest(leave: LeaveRequest): Observable<AddUserResponse> {
    // Modify the endpoint and headers as needed for your API
    const token = localStorage.getItem('token') || '';
    console.log();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<AddUserResponse>(`${this.baseUrl}/api/employees/leave`, leave, { headers });
  }

  constructor(private http: HttpClient) {}
  // New method to get all user details
  getAllUserDetails(): Observable<User[]> {
    const token = localStorage.getItem('token'); // Retrieve the authentication token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.baseUrl}/api/admin/users`, { headers });
  }
   // New method to get all leave details
   getAllLeaveDetails(): Observable<User[]> {
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.baseUrl}/api/admin/users`, { headers });
  }
  
  
  
  updateLeaveStatus(leaveId: number, status: string): Observable<void> {
    const body = { status }; // Create a request body with the new status
    return this.http.put<void>(`${this.baseUrl}/api/leave/${leaveId}/status`, body);
  }

// Reject a leave request by ID
rejectLeave(leaveId: number): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/api/leave/${leaveId}/reject`, {});
}

}