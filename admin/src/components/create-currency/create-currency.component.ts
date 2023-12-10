import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../lib/types';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EditCloseComponent } from '../edit-close/edit-close.component';
import { EditLoadingComponent } from '../edit-loading/edit-loading.component';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-create-currency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditCloseComponent,
    EditLoadingComponent,
  ],
  templateUrl: './create-currency.component.html',
  styleUrl: './create-currency.component.css',
})
export class CreateCurrencyComponent {
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

  saving = false;
  success = false;
  finished = false;

  codeExists: boolean = false;

  errors: string[] = [];

  constructor(private currencyService: CurrencyService) {
    this.code.setValidators([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(5),
    ]);
    this.name.setValidators([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]);
    this.value.setValidators([
      Validators.required,
      Validators.min(0),
      Validators.max(1000000),
    ]);
  }

  close() {
    this.finished = false;
    this.saving = false;
    this.success = false;

    this.code.setValue('');
    this.name.setValue('');
    this.value.setValue('');
    this.imageUrl.setValue('');

    this.currency = {
      id: 0,
      code: '',
      name: '',
      value: 0,
      imageUrl: '',
    };
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

  async create() {
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
      const searchCode = await this.currencyService.getCurrencyByCode(
        this.code.value
      );

      if (searchCode != null) {
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
        .createCurrency(this.currency)
        .then((foreing) => {
          if (foreing) {
            this.currency = foreing;
            this.success = true;
          }

          this.currencies.push(this.currency);
          this.currenciesChange.emit(this.currencies);
        })
        .finally(() => {
          this.saving = false;
          this.finished = true;
        });
    }, 2000);

    this.code.setValue('');
    this.name.setValue('');
    this.value.setValue('');
    this.imageUrl.setValue('');
  }
}
