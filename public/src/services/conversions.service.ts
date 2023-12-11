import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_BACKEND } from '../lib/constants';
import { Conversion } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class ConversionsService {
  constructor(private cookieService: CookieService) {}

  async getConversionsCount(): Promise<number | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Conversion/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: number = await get.json();
    console.log(response);

    return response;
  }

  async getConversionsUser(id: number): Promise<Conversion[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Conversion/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Conversion[] = await get.json();

    if (response.length > 0) {
      response.forEach((conversion) => {
        conversion.date = new Date(conversion.date);
      });
      return response;
    }

    return response;
  }

  async postConversion(
    userId: number,
    from: number,
    to: number,
    amount: number
  ): Promise<Conversion | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const post = await fetch(URL_BACKEND + '/api/Conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        userId: userId,
        fromCurrencyId: from,
        toCurrencyId: to,
        amount: amount,
      }),
    });

    if (post.status !== 200) {
      return null;
    }

    const response: Conversion = await post.json();

    if (response) {
      response.date = new Date(response.date);
      
      return response;
    }

    return null;
  }

  async getConversions(): Promise<Conversion[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Conversion/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Conversion[] = await get.json();

    if (response.length > 0) {
      response.forEach((conversion) => {
        conversion.date = new Date(conversion.date);
      });
      return response;
    }

    return response;
  }

  async getConversionsPage(page: number): Promise<Conversion[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Conversion/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Conversion[] = await get.json();

    if (response.length > 0) {
      response.forEach((conversion) => {
        conversion.date = new Date(conversion.date);
      });
      return response;
    }

    return response;
  }
}
