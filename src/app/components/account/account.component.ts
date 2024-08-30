import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = {
    username: '',
    email: ''
  };
  isLoggedIn: boolean = false;
  isModalOpen = false;
  modalContent: 'profile' | 'editProfile' = 'profile';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Log the localStorage for debugging
    console.log('LocalStorage:', localStorage);
  
    // Retrieve and parse the user object from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Check if the username exists
        if (user && user.username) {
          console.log('Stored Username:', user.username);
          this.authService.getUserDetails(user.username).subscribe(
            (data) => {
              this.user = data;
              this.isLoggedIn = true; // Set isLoggedIn to true since user details are fetched
            },
            (error) => {
              console.error('Error fetching user details', error);
            }
          );
        } else {
          console.error('No username found in user data');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }

  signOut() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    alert('You have been signed out.');
    this.router.navigate(['/homecontent']);
  }

  openModal(content: 'profile' | 'editProfile') {
    this.modalContent = content;
    this.isModalOpen = true;
  }

  closeModal(event: Event) {
    this.isModalOpen = false;
  }

  saveProfile() {
    console.log('Updating user:', this.user); // Log the user data being sent
    this.authService.updateUserDetails(this.user).subscribe(
      (response) => {
        console.log('Update response:', response); // Log the response
        alert('Profile updated successfully!');
        this.closeModal(new Event(''));
      },
      (error) => {
        console.error('Error updating profile', error); // Log the full error
      }
    );
  }

  deleteProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.authService.deleteUser(this.user.username).subscribe(
        () => {
          localStorage.removeItem('user');
          this.isLoggedIn = false;
          alert('Profile deleted successfully!');
          this.router.navigate(['/homecontent']);
          // If HomeComponent is also displayed, you may need to ensure it refreshes
          // Consider triggering an event or using a shared service to notify HomeComponent
        },
        (error) => {
          console.error('Error deleting profile', error);
        }
      );
    }
  }
  
}
