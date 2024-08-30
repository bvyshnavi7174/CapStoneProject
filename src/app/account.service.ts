// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
// src/app/models/user.model.ts
export interface User {
  username: string;
  email: string;
  name: string;
}
  // Import the User model

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  // Retrieve the user's profile from local storage or return a default profile
  getProfile(): User {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user) as User;  // Ensure the returned data is of type User
      } catch (error) {
        console.error('Failed to parse user data from local storage', error);
      }
    }
    // Return a mock profile if no user data is found in local storage
    return {
      username: 'defaultUsername',
      email: 'default@example.com',
      name: 'Default User'
    };
  }

  // Update the user's profile in local storage
  updateProfile(updatedProfile: User): void {
    try {
      localStorage.setItem('user', JSON.stringify(updatedProfile));  // Save the updated profile
    } catch (error) {
      console.error('Failed to update user data in local storage', error);
    }
  }

  // Clear the user's profile from local storage (e.g., on logout)
  clearProfile(): void {
    localStorage.removeItem('user');
  }
}
