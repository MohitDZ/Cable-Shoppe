import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) {}

  signup(email: string, mobileNumber: string, password: string, accountType: string): Observable<any> {
    const body = { email, mobileNumber, password, accountType };
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  login(email: string, password: string, accountType: string): Observable<any> {
    const body = { email, password, accountType };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
