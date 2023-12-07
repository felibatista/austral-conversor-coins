import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { themeChange } from 'theme-change'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isLoginPage: boolean = false;

  logout() {
    this.loginService.logout();
  }
  
  constructor(private loginService: LoginService) {
    if (window.location.pathname === '/login') {
      this.isLoginPage = true;
    }
  }
}
