import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, User, UserForUpdate } from '../../lib/types';
import { fromNumberToPlanName, fromPlanNameToNumber } from '../../lib/util';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
    subscription: {
      id: 0,
      name: '',
      price: 0,
      limit: 0,
    },
  };
  @Input() subscriptions: Subscription[] = [];
  @Input() users: User[] = [];
  @Output() usersChange = new EventEmitter<User[]>();

  userName = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  plan = new FormControl('');

  saving: boolean = false;
  success: boolean = false;

  closeMessage: boolean = false;
  sureDelete: boolean = false;

  constructor(private userService: UserService) {
    this.firstName.setValidators([
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.lastName.setValidators([
      Validators.minLength(3),
      Validators.maxLength(30),
    ]);
  }

  parseErrors(errors: ValidationErrors) {
    if (errors == null) {
      return;
    }

    if (errors?.['required']) {
      return 'Completa este campo';
    }

    if (errors?.['minlength']) {
      return (
        'El campo debe tener mínimo ' +
        errors?.['minlength'].requiredLength +
        ' caracteres'
      );
    }

    if (errors?.['maxlength']) {
      return (
        'El campo puede tener máximo ' +
        errors?.['maxlength'].requiredLength +
        ' caracteres'
      );
    }

    if (errors?.['min']) {
      return 'El campo debe tener un valor mínimo de ' + errors?.['min'].min;
    }

    if (errors?.['email']) {
      return 'El campo debe ser un correo electrónico válido';
    }

    return '';
  }

  getSubscriptionId(subscriptionName: string): number {
    return this.subscriptions.find(
      (subscription) => subscription.name === subscriptionName
    )!.id;
  }

  save() {
    if (
      this.firstName.errors != null ||
      this.lastName.errors != null ||
      this.userName.errors != null
    ) {
      return;
    }

    if (this.firstName.value) {
      this.user.firstName = this.firstName.value;
    }

    if (this.lastName.value) {
      this.user.lastName = this.lastName.value;
    }

    if (this.userName.value) {
      this.user.userName = this.userName.value;
    }

    if (this.plan.value) {
      this.user.subscription.id = this.getSubscriptionId(this.plan.value);
    }

    this.saving = true;

    const userForUpdate: UserForUpdate = {
      id: this.user.id,
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      subscriptionId: this.user.subscription.id,
    };


    setTimeout(() => {
      this.userService
        .updateUser(userForUpdate)
        .then((success) => {
          //update user list
          this.user.subscription = this.subscriptions.find(
            (subscription) => subscription.id === this.user.subscription.id
          )!;
          this.success = success;
        })
        .finally(() => {
          this.saving = false;
          this.closeMessage = true;
        });
    }, 2000);

    this.firstName.setValue('');
    this.lastName.setValue('');
    this.userName.setValue('');
    this.plan.setValue('');
  }

  close() {
    this.user = {
      id: 0,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      subscription: {
        id: 0,
        name: '',
        price: 0,
        limit: 0,
      },
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
    this.userName.setValue('');
    this.plan.setValue('');
  }

  sureClick() {
    this.sureDelete = true;
  }
}
