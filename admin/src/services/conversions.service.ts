import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_BACKEND } from '../lib/constants';
import { Conversion } from '../lib/types';

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {
  constructor(private cookieService: CookieService) { }

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
    console.log(response)

    return response;
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

    const response: any[] = await get.json();

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

    const response: any[] = await get.json();

    return response;
  }
}
