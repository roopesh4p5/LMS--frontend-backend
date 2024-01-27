import { Component } from '@angular/core';
import { User } from 'src/app/admin/leaveapproval/Leaverequest.model';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-myleaves',
  templateUrl: './myleaves.component.html',
  styleUrls: ['./myleaves.component.css']
})
export class MyleavesComponent {
  leaveRequests: User[] = []; // Initialize as an empty array of User type
  myid: any;
  
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'text-yellow';
      case 'approved':
        return 'text-green';
      case 'rejected':
        return 'text-red';
      default:
        return ''; 
    }
  }
  calculateTotalLeaveDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = (end.getTime() - start.getTime())+1;
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days
    return totalDays;
  }
  
  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    // Retrieve the user's ID from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);
    if (loggedInUser && loggedInUser.id) {
      this.myid = loggedInUser.id;
    } else {
      console.error('User is not logged in or user data is incomplete.');
    }
    this.leaveService.getAllUserDetails().subscribe(
      (response: any) => {
        if (Array.isArray(response.users)) {
          // Assuming response.users is the correct array
          this.leaveRequests = response.users;

          const userLeaveDetails: { leaveDetails: { id: number; startDate: any; endDate: any; reason: any; status: any; }; }[] = [];

          this.leaveRequests.forEach((user) => {
         
            user.leave.forEach((leaveEntry: { id: any; startDate: any; endDate: any; reason: any; status: any; }) => {
              const leaveDetails = {
                id: leaveEntry.id,
                startDate: leaveEntry.startDate,
                endDate: leaveEntry.endDate,
                reason: leaveEntry.reason,
                status: leaveEntry.status,
              };
              userLeaveDetails.push({ leaveDetails });
            });
          })
          userLeaveDetails.reverse();

        } else {
          console.error('Invalid data received. Expected an array under the "users" property.');
        }
      },
      (error) => {
        console.error('Error fetching leave requests', error);
      }
    );
  }
}