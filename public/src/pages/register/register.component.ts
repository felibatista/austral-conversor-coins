import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/form-register/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    RegisterFormComponent
  ],
})
export class RegisterComponent {

}
