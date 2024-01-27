import { Component } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  holidays: any[] | undefined; // Define the data structure according to your server response
  tomorrowHolidays: any[] = [];

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  isTomorrow(date: string): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    console.log(tomorrowDate);
    return date === tomorrowDate;
  }
  loadHolidays(): void {
    this.holidayService.getHolidays().subscribe((data: any) => {
      console.log('Data received:', data);
  
      if (data && data.holidays) {
        const holidaysArray = data.holidays;
  
        // Filter holidays for tomorrow
        this.tomorrowHolidays = holidaysArray.filter((holiday: any) => this.isTomorrow(holiday.date));
      }
    });
  }
}
