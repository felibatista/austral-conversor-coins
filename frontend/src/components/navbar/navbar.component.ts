import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
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
