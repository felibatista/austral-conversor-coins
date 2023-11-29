import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.authenticate(this.username, this.password).then((res) => {
      if (res.success) {
        window.location.href = '/';
      } else {
        alert(res.message);
      }
    });
  }
}
