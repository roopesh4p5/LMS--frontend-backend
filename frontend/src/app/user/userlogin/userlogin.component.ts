import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css'],
})
export class UserloginComponent {
  formData = {
    username: '',
    password: '',
  };
  isLoggedIn: boolean = false; 
  toggleClass() {
    const container = document.querySelector('.container');
    if (container) {
        container.classList.toggle('active');
    }
}


  constructor(private loginService: LoginService, private router:Router) {}

  onSubmit(): void {
    const { username, password } = this.formData;
    // Call the login service method
    this.loginService.login(username, password).subscribe(
      (response: any) => {
        // Handle successful login
        alert("Login Successful")
        // console.log('Login successful');

        
        // Store the token in local storage
        localStorage.setItem('token', response.token);
        const userRole = this.loginService.getUserRole();
        if (userRole === 'admin') {
          this.router.navigate(['/admindashboard']);
        } else if (userRole === 'user') {
          this.router.navigate(['/userdashboard']);
        } else {
          // Handle unexpected roles or errors
          console.error('Unexpected role:', userRole);
        }
       
      },
      (error) => {
        // Handle login error, e.g., display an error message
        alert(error.error.message)
        console.error('Login failed', error);
      }
    );
  }
}
