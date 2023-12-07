import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../lib/types';
import { fromNumberToPlanName, fromPlanNameToNumber } from '../../lib/util';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { EditLoadingComponent } from '../edit-loading/edit-loading.component';
import { EditCloseComponent } from '../edit-close/edit-close.component';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditLoadingComponent,
    EditCloseComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  @Input() user: User = {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    subscriptionId: 0,
  };
  @Input() users: User[] = [];
  @Output() usersChange = new EventEmitter<User[]>();

  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  plan = new FormControl('');

  saving: boolean = false;
  success: boolean = false;

  closeMessage: boolean = false;
  sureDelete: boolean = false;

  constructor(private userService: UserService) {
    this.firstName.setValidators([Validators.minLength(3), Validators.maxLength(20)]);
    this.lastName.setValidators([Validators.minLength(3), Validators.maxLength(30)]);
    this.email.setValidators([Validators.email]);
  }

  parseErrors(errors: ValidationErrors){
    if (errors == null){
      return;
    }

    if (errors?.["required"]){
      return "Completa este campo";
    }

    if (errors?.["minlength"]){
      return "El campo debe tener mínimo " + errors?.["minlength"].requiredLength+ " caracteres";
    }

    if (errors?.["maxlength"]){
      return "El campo puede tener máximo " + errors?.["maxlength"].requiredLength+ " caracteres";
    }

    if (errors?.["min"]){
      return "El campo debe tener un valor mínimo de " + errors?.["min"].min;
    }

    if (errors?.["email"]){
      return "El campo debe ser un correo electrónico válido";
    }

    return ""
  }

  planToText(plan: number): string {
    return fromNumberToPlanName(plan);
  }

  textToPlan(plan: string): number {
    return fromPlanNameToNumber(plan);
  }

  save() {
    if (this.firstName.errors != null || this.lastName.errors != null || this.email.errors != null){
      console.log(this.firstName.errors, this.lastName.errors, this.email.errors)
      return;
    }

    if (this.firstName.value) {
      this.user.firstName = this.firstName.value;
    }

    if (this.lastName.value) {
      this.user.lastName = this.lastName.value;
    }

    if (this.email.value) {
      this.user.email = this.email.value;
    }

    if (this.plan.value) {
      this.user.subscriptionId = this.textToPlan(this.plan.value!);
    }

    this.saving = true;

    setTimeout(() => {
      this.userService
        .updateUser(this.user)
        .then((success) => {
          this.success = success;
        })
        .finally(() => {
          this.saving = false;
          this.closeMessage = true;
        });
    }, 2000);

    this.firstName.setValue('');
    this.lastName.setValue('');
    this.email.setValue('');
    this.plan.setValue('');
  }

  close() {
    this.user = {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      subscriptionId: 0,
    };

    this.success = false;
    this.sureDelete = false;
    this.closeMessage = false;
  }

  deleteUser() {
    this.saving = true;

    setTimeout(() => {
      this.userService
        .deleteUser(this.user.id)
        .then((success) => {
          this.success = success;
          this.usersChange.emit(
            this.users.filter((user) => user.id !== this.user.id)
          );
        })
        .finally(() => {
          this.saving = false;
          this.closeMessage = true;
        });
    }, 2000);

    this.firstName.setValue('');
    this.lastName.setValue('');
    this.email.setValue('');
    this.plan.setValue('');
  }

  sureClick() {
    this.sureDelete = true;
  }
}
