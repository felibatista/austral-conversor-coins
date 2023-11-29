import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  imports: [
    FormsModule
  ]
})

export class RegisterFormComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    this.authService.register(registerData).then((res) => {
      if (res.success) {
        window.location.href = '/';
      } else {
        alert(res.message);
      }
    });
  }
}
