import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define the expected server response structure
interface LoginResponse {
  token: string;
  user: any; // Replace 'any' with the actual type of your user data
  role: string;
}
interface AddUserResponse {
  message: string;
  user: any; // Replace 'any' with the actual type of your user data
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  addUser(newUser: any): Observable<AddUserResponse> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');
  
    // Check if a token exists
    if (!token) {
      // Handle the case where the user is not authenticated
      return throwError('User is not authenticated.');
    }

    // Set up the request headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  
    // Send the POST request with the headers
    return this.http.post<AddUserResponse>(
      `${this.baseUrl}/api/add-user`,
      newUser,
      { headers } // Include the headers
    );
  }
  









  login(username: string, password: string): Observable<LoginResponse> {
    const loginData = { username, password };
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/api/login`, loginData)
      .pipe(
        tap((response) => {
          // Log the user details and role from the server response
          // console.log('User Detail from Server:', response.user);
          console.log('User Role:', response.role);

          // Store the token, user detail, and role in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('role', response.role); // Store the role
        })
      );
  }

  // Check if the user is logged in (you may use a JWT token or any other authentication mechanism)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    return !!token; // Return true if a token exists; otherwise, false
  }

  // Retrieve the username from the JWT token or user data
  getUsername(): string | null {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    // Retrieve user detail from local storage
    const userDetailString = localStorage.getItem('user');

    if (userDetailString) {
      // If user detail exists, parse it
      const userDetail = JSON.parse(userDetailString);

      return userDetail?.username || null; // Return the username or null
    }

    // If user detail doesn't exist, return null
    return null;
  }

  getname(): string | null {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    // Retrieve user detail from local storage
    const userDetailString = localStorage.getItem('user');

    if (userDetailString) {
      // If user detail exists, parse it
      const userDetail = JSON.parse(userDetailString);

      return userDetail?.name || null; // Return the username or null
    }

    // If user detail doesn't exist, return null
    return null;
  }

  // Retrieve the user's role
  getUserRole(): string | null {
    return localStorage.getItem('role') || null;
  }

  // Logout by clearing the JWT token, user detail, and role from local storage
  logout(): void {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('user'); // Remove the user detail from local storage
    localStorage.removeItem('role'); // Remove the role from local storage
    // Perform any other logout-related actions (e.g., redirecting to the login page)
  }
}

function throwError(arg0: string): Observable<AddUserResponse> {
  throw new Error('Function not implemented.');
}

