import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status: boolean = false;

  isLoginIn() {
    this.status = !this.status;
  }
  constructor() { }
}
