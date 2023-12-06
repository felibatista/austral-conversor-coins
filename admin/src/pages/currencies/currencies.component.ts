import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foreing } from '../../lib/types';
import { CurrencyService } from '../../services/currency.service';
import { TableCurrenciesComponent } from '../../components/table-currencies/table-currencies.component';
import { EditCurrencyComponent } from '../../components/edit-currency/edit-currency.component';
import { CreateCurrencyComponent } from '../../components/create-currency/create-currency.component';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, TableCurrenciesComponent, EditCurrencyComponent, CreateCurrencyComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent implements OnInit {
  currencies: Foreing[] = [];
  currencyToEdit: Foreing = {
    id: 0,
    code: '',
    name: '',
    value: 0,
    imageUrl: ''
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrenciesPage(1).then((currencies) => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }

  createCurrency(){
    this.currencyToEdit = {
      id: 1,
      code: '',
      name: '',
      value: 0,
      imageUrl: ''
    };
  }
}
