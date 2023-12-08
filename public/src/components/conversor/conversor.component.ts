import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  computed,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Conversion, Foreing, Plan, User } from '../../lib/types';
import { getColorFromMax, getFillFromMax } from '../../lib/util';
import { ConversorCurrenciesComponent } from '../conversor-currencies/conversor-currencies.component';
import { ConversorIconComponent } from '../conversor-icon/conversor-icon.component';
import { ConversionsService } from '../../services/conversions.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ConversorCurrenciesComponent,
    ConversorIconComponent,
    ReactiveFormsModule,
  ],
})
export class ConversorComponent implements OnInit {
  @Input() currencies: Foreing[] = [];
  @Input() conversions: Conversion[] = [];
  @Input() user: User | null = null;
  @Input() plan: Plan | null = null;

  from: Foreing | null = null;
  to: Foreing | null = null;
  amount = new FormControl('', [Validators.required, Validators.min(0)]);
  result: number = 0;

  color: string = '#000000';
  fill: string = '#000000';
  error: string = '';

  logged: boolean = false;
  loading: boolean = false;
  conversionSuccess: boolean = false;

  constructor(private conversionsService: ConversionsService) {}

  parseErrors(errors: ValidationErrors) {
    if (errors == null) {
      return;
    }

    if (errors?.['required']) {
      return 'Completa este campo';
    }

    if (errors?.['min']) {
      return 'El campo debe tener un valor mínimo de ' + errors?.['min'].min;
    }

    return '';
  }

  conversionLimitReached(): boolean {
    return this.conversionRemaining() == 0;
  }

  setColors(){
    this.color = getColorFromMax(
      this.plan!.limit - this.totalConversions(),
      this.plan!.limit
    );

    this.fill = getFillFromMax(
      this.plan!.limit - this.totalConversions(),
      this.plan!.limit
    );
  }

  swapCurrencies() {
    const aux = this.from;
    this.from = this.to;
    this.to = aux;
    this.result = 0;
  }

  totalConversions(): number {
    return this.conversions.length;
  }

  conversionRemaining() {
    if (this.plan == null) {
      return 0;
    }

    if (this.plan.limit == -1) {
      return -1;
    }

    return this.plan.limit - this.totalConversions();
  }

  reachedLimit() {
    if (this.plan == null) {
      return false;
    }

    if (this.plan.limit == -1) {
      return false;
    }

    return this.totalConversions() >= this.plan.limit;
  }

  canConvert(): boolean {
    if (this.from != null && this.to != null && this.amount != null && !this.reachedLimit()) {
      return this.from && this.to && Number(this.amount.value) > 0;
    } else {
      return false;
    }
  }

  setFrom(foreing: Foreing): void {
    this.from = foreing;
    this.result = 0;
  }

  setTo(foreing: Foreing): void {
    this.to = foreing;
    this.result = 0;
  }

  async convert() {
    if (
      !this.logged ||
      this.loading ||
      !this.canConvert() ||
      !this.amount.valid ||
      this.reachedLimit()
    ) {
      return;
    }

    if (
      this.from == null ||
      this.to == null ||
      this.amount == null ||
      this.user == null
    ) {
      return;
    }

    this.loading = true;

    const conversionPost = await this.conversionsService.postConversion(
      this.user.id,
      this.from.id,
      this.to.id,
      Number(this.amount.value)
    );

    setTimeout(() => {
      if (!conversionPost) {
        this.error = 'No se pudo realizar la conversión';
        return;
      }

      this.conversions.push(conversionPost);
      this.result =
        (Number(this.amount.value) * this.from?.value!) / this.to!.value;
      this.error = '';

      this.setColors();

      this.loading = false;
      this.conversionSuccess = true;
    }, 1000);

    setTimeout(() => {
      this.conversionSuccess = false;
    }, 5000);
  }

  ngOnInit(): void {
    if (this.plan != null) {
      this.setColors();
    }

    if (this.user != null) {
      this.logged = true;
    }

    this.to = this.currencies[0];
    this.from = this.currencies[1];

    /*this.from = {
      id: 1,
      code: 'ARS',
      name: 'Pesos Argentinos',
      value: 0.33,
      imageUrl:
        'https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/ar.svg',
    };

    this.to = {
      id: 2,
      code: 'USD',
      name: 'Dolar Estadounidense',
      value: 1,
      imageUrl:
        'https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/us.svg',
    };

    /*this.foreingService.getForeings().then((data: Array<Foreing>) => {
      if (data.length == 0) {
        return;
      }

      this.from = data[0];
      this.to = data[1];

      data = data.sort((a, b) => {
        if (a.code < b.code) {
          return -1;
        }

        if (a.code > b.code) {
          return 1;
        }

        return 0;
      });

      data.forEach((foreing) => {
        this.foreings.push(foreing);

        if (this.from == null) {
          this.from = foreing;
        }

        if (this.to == null) {
          this.to = foreing;
        }
      });
    });

    */
  }
}
