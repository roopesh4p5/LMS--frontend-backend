import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { LeaveRequest, User } from './Leaverequest.model';

@Component({
  selector: 'app-leaveapproval',
  templateUrl: './leaveapproval.component.html',
  styleUrls: ['./leaveapproval.component.css'],
})
export class LeaveapprovalComponent implements OnInit {

  leaveRequests: User[] = []; // Initialize as an empty array of User type

  constructor(private leaveService: LeaveService) { }

  calculateTotalLeaveDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = (end.getTime() - start.getTime())+1;
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days
    return totalDays;
  }
  

  ngOnInit(): void {
    this.leaveService.getAllUserDetails().subscribe(
      (response: any) => {
        // Check if the response contains the expected structure
        if (Array.isArray(response.users)) {
          // Assuming response.users is the correct array
          this.leaveRequests = response.users;

          // Extract and store username and leave details
          const userLeaveDetails: { username: any; leaveDetails: { id: any; startDate: any; endDate: any; reason: any; status: any; }; }[] = [];

          this.leaveRequests.forEach((user) => {
            const username = user.username;
            user.leave.forEach((leaveEntry: { id: any; startDate: any; endDate: any; reason: any; status: any; }) => {
              const leaveDetails = {
                id: leaveEntry.id,
                startDate: leaveEntry.startDate,
                endDate: leaveEntry.endDate,
                reason: leaveEntry.reason,
                status: leaveEntry.status,
              };
              userLeaveDetails.push({ username, leaveDetails });
            });
          });

          // Now, you can use userLeaveDetails as needed
          // console.log(userLeaveDetails);
        } else {
          console.error('Invalid data received. Expected an array under the "users" property.');
        }
      },
      (error) => {
        console.error('Error fetching leave requests', error);
        // Handle error as needed
      }
    );
  }

  approveLeave(leave: any): void {
    // Call the service method to update leave status
    this.leaveService.updateLeaveStatus(leave.id, 'approved').subscribe(
      () => {
        // Handle the approval success as needed
        // Optionally, update the local leaveRequests array
        leave.status = 'approved'; // Assuming leave.status can be updated locally
      },
      (error) => {
        console.error('Error updating leave status', error);
        // Handle error as needed
      }
    );
  }
  rejectLeave(leave: any): void {
    // Call the service method to update leave status to 'rejected'
    this.leaveService.updateLeaveStatus(leave.id, 'rejected').subscribe(
      () => {
        // Handle the rejection success as needed
        // Optionally, update the local leaveRequests array
        leave.status = 'rejected'; // Assuming leave.status can be updated locally
      },
      (error) => {
        console.error('Error updating leave status', error);
        // Handle error as needed
      }
    );
}

}
