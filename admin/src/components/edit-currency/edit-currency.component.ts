import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foreing, User } from '../../lib/types';
import { fromNumberToPlanName, fromPlanNameToNumber } from '../../lib/util';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Input() currency: Foreing = {
    id: 0,
    code: '',
    name: '',
    value: 0,
    imageUrl: '',
  };
  
  @Input() currencies: Foreing[] = [];
  @Output() currenciesChange = new EventEmitter<Foreing[]>();

  code = new FormControl('');
  name = new FormControl('');
  value = new FormControl('');
  imageUrl = new FormControl('');

  saving: boolean = false;
  success: boolean = false;

  closeMessage: boolean = false;
  sureDelete: boolean = false;

  constructor(private currencyService: CurrencyService) {}

  save() {
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
      this.currencyService.updateCurrency(this.currency)
        .then((success) => {
          console.log(success)
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
  }

  deleteCurrency() {
    this.saving = true;

    setTimeout(() => {
      this.currencyService
        .deleteCurrency(this.currency.id)
        .then((success) => {
          this.success = success;
          this.currenciesChange.emit(
            this.currencies.filter((currency) => currency.id !== this.currency.id)
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
