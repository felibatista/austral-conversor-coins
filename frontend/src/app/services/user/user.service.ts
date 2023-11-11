import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    id: 0,
    name: '',
    email: '',
    token: ''
  };

  
  constructor(private http: HttpClient) { }
  
  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getToken(): string {
    return this.user.token;
  }

  isLogged(): boolean {
    return this.user.token !== '';
  }
  
  logout() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      token: ''
    };
  }
  
  private url: string = 'https://localhost:7265/api/Foreing/all';
  
  authenticate(username: string, password: string) {
    
  }
}
