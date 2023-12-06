import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Foreing } from '../../lib/types';
import { CurrencyService } from '../../services/currency.service';
import { TableCurrenciesComponent } from '../../components/table-currencies/table-currencies.component';
import { EditCurrencyComponent } from '../../components/edit-currency/edit-currency.component';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, TableCurrenciesComponent, EditCurrencyComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent implements OnInit {
  currencies: Foreing[] = [];
  input: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrenciesPage(1).then((currencies) => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }
}
