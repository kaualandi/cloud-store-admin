import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IToken, IUser } from '../models/user';
import { Md5 } from 'md5-typescript';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(email: string, password: string) {
    const body = {
      email,
      password: Md5.init(password),
    };

    return this.http.post<IToken>('auth/login', body);
  }

  me() {
    return this.http.get<IUser>('auth/me');
  }
}
