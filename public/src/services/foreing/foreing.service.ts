import { Injectable, WritableSignal, signal } from '@angular/core';
import { Foreing } from '../../types/foreing';

@Injectable({
  providedIn: 'root'
})

export class ForeingService {
  foreings: WritableSignal<Foreing[]> = signal([]);

  url = 'https://localhost:7265';

  constructor() { }

  async getForeings() {
    if (this.foreings().length > 0) {
      return this.foreings();
    }

    const get = await fetch(this.url + '/api/Foreing/all');

    const response:Foreing[] = await get.json();

    if (response.length > 0) {
      this.foreings.set(response);
      return response;
    }

    return response;
  }

  async getForeing(id: number) {
    if (this.foreings().length > 0) {
      return this.foreings().find((foreing) => foreing.id == id);
    }

    const get = await fetch(this.url + '/api/Foreing/' + id);

    const response:Foreing = await get.json();

    return response;
  }
}
