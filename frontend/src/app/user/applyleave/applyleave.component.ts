import { Component } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent {
  leave: any = {};
  message: string = '';
  username: string | null = null;
  
  constructor(
    private leaveRequestService: LeaveService,
    private authService: LoginService
  ) {
    this.username = this.authService.getname();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the current date as "YYYY-MM-DD"
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submitLeaveRequest() {
    if (!this.leave.startDate || !this.leave.endDate || !this.leave.reason) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Set the status to "pending" before submitting
    this.leave.status = 'pending';
  
    this.leaveRequestService.submitLeaveRequest(this.leave)
      .subscribe(
        (response: any) => {
          this.message = response.message;
          alert('Leave Request Submitted');
          this.leave = {}; // Clear the form after submission
        },
        (error) => {
          this.message = 'Error submitting leave request';
          console.error(error); // Log the error to the console for debugging
        }
      );
  }
}
