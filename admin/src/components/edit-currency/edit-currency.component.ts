import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency, User } from '../../lib/types';
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
  selector: 'app-edit-currency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditLoadingComponent,
    EditCloseComponent,
  ],
  templateUrl: './edit-currency.component.html',
  styleUrl: './edit-currency.component.css',
})
export class EditCurrencyComponent {
  @Input() currency: Currency = {
    id: 0,
    code: '',
    name: '',
    value: 0,
    imageUrl: '',
  };

  @Input() currencies: Currency[] = [];
  @Output() currenciesChange = new EventEmitter<Currency[]>();

  code = new FormControl('');
  name = new FormControl('');
  value = new FormControl('');
  imageUrl = new FormControl('');

  saving: boolean = false;
  success: boolean = false;

  closeMessage: boolean = false;
  sureDelete: boolean = false;
  codeExists: boolean = false;

  constructor(private currencyService: CurrencyService) {
    this.code.setValidators([Validators.minLength(2), Validators.maxLength(5)]);
    this.name.setValidators([
      Validators.minLength(3),
      Validators.maxLength(30),
    ]);
    this.value.setValidators([Validators.min(0), Validators.max(1000000)]);
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

    return '';
  }

  async save() {
    if (
      this.code.errors != null ||
      this.name.errors != null ||
      this.value.errors != null ||
      this.imageUrl.errors != null
    ) {
      return;
    }

    //check if code exists
    if (this.code.value) {
      const searchCode = await this.currencyService.getCurrencyByCode(this.code.value)

      if (searchCode != null && searchCode.id !== this.currency.id) {
        this.codeExists = true;
        return;
      }
    }

    if (this.code.value) {
      this.currency.code = this.code.value;
    }

    if (this.name.value) {
      this.currency.name = this.name.value;
    }

    if (this.value.value) {
      this.currency.value = Number(this.value.value);
    }

    if (this.imageUrl.value) {
      this.currency.imageUrl = this.imageUrl.value;
    }

    this.saving = true;

    setTimeout(() => {
      this.currencyService
        .updateCurrency(this.currency)
        .then((success) => {
          console.log(success);
          this.success = success;
        })
        .finally(() => {
          this.saving = false;
          this.closeMessage = true;
        });
    }, 2000);

    this.code.setValue('');
    this.name.setValue('');
    this.value.setValue('');
    this.imageUrl.setValue('');
  }

  close() {
    this.currency = {
      id: 0,
      code: '',
      name: '',
      value: 0,
      imageUrl: '',
    };

    this.success = false;
    this.sureDelete = false;
    this.closeMessage = false;

    this.code.setValue('');
    this.name.setValue('');
    this.value.setValue('');
    this.imageUrl.setValue('');
  }

  deleteCurrency() {
    this.saving = true;

    setTimeout(() => {
      this.currencyService
        .deleteCurrency(this.currency.id)
        .then((success) => {
          this.success = success;
          this.currenciesChange.emit(
            this.currencies.filter(
              (currency) => currency.id !== this.currency.id
            )
          );
        })
        .finally(() => {
          this.saving = false;
          this.closeMessage = true;
        });
    }, 2000);

    this.code.setValue('');
    this.name.setValue('');
    this.value.setValue('');
    this.imageUrl.setValue('');
  }

  sureClick() {
    this.sureDelete = true;
  }
}
