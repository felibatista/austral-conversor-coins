import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { Foreing } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  async getCurrencys(): Promise<Foreing[] | null> {
    const get = await fetch(URL_BACKEND + '/api/Foreing/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Foreing[] = await get.json();

    return response;
  }
}
