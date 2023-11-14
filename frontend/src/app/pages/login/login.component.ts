import { Component } from '@angular/core';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    LoginFormComponent
  ],
  standalone: true
})
export class LoginComponent {

}
