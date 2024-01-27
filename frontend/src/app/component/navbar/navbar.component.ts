import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for redirection
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean =false;
  isUser:boolean=false;

  constructor(private loginService: LoginService, private router: Router) {}
getDashboardLink(): string {
  if (this.isAdmin) {
    return '/admindashboard'; // Replace with the actual admin dashboard route
  } else if (this.isUser) {
    return '/userdashboard'; // Replace with the actual user dashboard route
  } else {
    return '/'; // Default route for unauthenticated users
  }
}
  ngOnInit(): void {
    const userRole = this.loginService.getUserRole();
    if (userRole === 'admin') {
      this.isAdmin = true;
    }else{
      this.isUser=true;
    }
  }

  // Use this function to check if the user is logged in
  isLoggedIn(): boolean {
    // Use the loginService to determine if the user is logged in
    return this.loginService.isLoggedIn();
  }

  // Use this function to get the username of the logged-in user
  getUsername(): string|null {
    // Use the\ loginService to retrieve the username
    return this.loginService.getUsername();
  }

  // Use this function to handle the logout action
  logout(): void {
    if(confirm("You will be Logged Out")){

      // Implement the logout logic in your loginService
      this.loginService.logout();
  
      // Clear JWT token and redirect to the root page
      // You should replace 'your-login-route' with your actual login route
      this.router.navigate(['/home']);
    }
  }
}
