import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  formData = {
    username: '',
    password: '',
    name: '',
  };

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    // Check if any input field is empty
    if (!this.formData.username || !this.formData.password || !this.formData.name) {
      alert('Please fill in all fields before submitting the form.');
      return;
    }

    const newUser = {
      id: Date.now(), // Generate a unique ID for the new user
      username: this.formData.username,
      password: this.formData.password,
      name: this.formData.name,
      leave: [], // Initialize an empty leave array for the new user
    };

    // Call the service method to add the new user to the database
    this.loginService.addUser(newUser).subscribe(
      (response) => {
        // Handle successful user addition
        alert('User added successfully');
        // console.log('User added:', response);

        // Clear the form
        this.formData = {
          username: '',
          password: '',
          name: '',
        };
      },
      (error) => {
        // Handle user addition error
        if (error.status === 400 && error.error.message === 'Username already exists') {
          alert('Username already exists in the database. Please choose a different username.');
        } else {
          alert('An error occurred while adding the user. Please try again later.');
        }

        console.error('User addition failed', error);
        // console.log(newUser);
      }
    );
  }
}
