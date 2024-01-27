import { Component, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  holidayData = {
    name: '',
    date: ''
  };
  showAlert = false;
  employees: any[] = [];
  
  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.holidayService.getAllUserDetails().subscribe(
      (data: any[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  deleteEmployee(employeeId: number) {
    if(confirm(`Are you sure?`)){
      this.holidayService.deleteEmployee(employeeId).subscribe(() => {
        // After deleting, reload the list of employees
        this.loadEmployees();
      });
  
    }
      }

  addHoliday() {
    // Check if the input fields are empty
    if (!this.holidayData.name || !this.holidayData.date) {
      alert("Please fill in all fields.");
      return; // Exit the method if fields are empty
    }

    // If the fields are not empty, proceed with adding the holiday
    this.holidayService.postHoliday(this.holidayData).subscribe(() => {
      alert('Holiday Added');
      // Handle success, e.g., clear the form
      this.holidayData = {
        name: '',
        date: ''
      };
    });
  }
}
