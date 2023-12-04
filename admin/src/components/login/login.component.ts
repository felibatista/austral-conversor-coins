import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  error: boolean = false;
  loading: boolean = false;

  constructor(private loginService: LoginService) {}

  onSubmit(): void {
    this.loading = true;

    setTimeout(() => {
      this.loginService
        .authenticate(this.username, this.password)
        .then((res) => {
          this.error = !res.success;
        })
        .finally(() => {
          this.loading = false;
        });
    }, 1000);
  }
}
