import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foreing } from '../../lib/types';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditCloseComponent } from '../edit-close/edit-close.component';
import { EditLoadingComponent } from '../edit-loading/edit-loading.component';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-create-currency',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditCloseComponent, EditLoadingComponent],
  templateUrl: './create-currency.component.html',
  styleUrl: './create-currency.component.css'
})
export class CreateCurrencyComponent {
  @Input() currency: Foreing = {
    id: 0,
    code: '',
    name: '',
    value: 0,
    imageUrl: ''
  };

  @Input() currencies: Foreing[] = [];
  @Output() currenciesChange = new EventEmitter<Foreing[]>();

  code = new FormControl('', Validators.required);
  name = new FormControl('');
  value = new FormControl('');
  imageUrl = new FormControl('');

  saving = false;
  success = false;
  finished = false;

  constructor(private currencyService: CurrencyService) {}

  close(){
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
      imageUrl: ''
    };
  }

  create(){
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
      this.currencyService.createCurrency(this.currency)
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
