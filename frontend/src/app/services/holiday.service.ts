import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Holiday } from './holiday.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private readonly baseUrl = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {}

  postHoliday(holidayData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/holidays`, holidayData);
  }

  
  getHolidays(): Observable<Holiday[]> {
    const holidaysUrl = `${this.baseUrl}/api/holidays`;
    return this.http.get<Holiday[]>(holidaysUrl);
  }
  
  getAllUserDetails(): Observable<any[]> {
    const allUserDetailsUrl = `${this.baseUrl}/api/employees`;
    return this.http.get<any[]>(allUserDetailsUrl);
  }
  
  deleteEmployee(employeeId: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/api/employees/${employeeId}`; // Assuming your endpoint for deleting employees is '/api/employees/:employeeId'
    return this.http.delete(deleteUrl);
  }
  
}