import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginFormComponent {
  @Input() username: string = '';
  @Input() password: string = '';

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
