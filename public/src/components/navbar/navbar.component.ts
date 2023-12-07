import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isLoginPage: boolean = false;
  logged: boolean | null = null;

  loading: boolean = true;

  logout() {
    this.loginService.logout();
    window.location.href = '/';
  }

  constructor(private loginService: LoginService) {
    if (window.location.pathname === '/login') {
      this.isLoginPage = true;
    }
    
    this.logged = this.loginService.isLogged();

    this.loading = false;
  }
}
