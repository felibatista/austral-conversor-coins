import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForeingService {
  private url: string = 'https://type.fit/api/quotes';

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.http.get(this.url);
  }
}
