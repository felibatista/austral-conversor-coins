import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule],
})

export class NavbarComponent {
  logged: boolean | null = null;

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }

  constructor(private authService: AuthService) {
    this.authService.isLogged().then((res) => {
      this.logged = res;
    })
  }
}
