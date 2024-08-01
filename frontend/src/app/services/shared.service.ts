// src/app/shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private activeFormSubject = new BehaviorSubject<'login' | 'register'>('login');
  activeForm$ = this.activeFormSubject.asObservable();

  setActiveForm(form: 'login' | 'register') {
    this.activeFormSubject.next(form);
  }

  getActiveForm() {
    return this.activeFormSubject.value;
  }

  toggleForm(targetForm: 'login' | 'register') {
    const currentForm = this.getActiveForm();
    if (currentForm !== targetForm) {
      this.setActiveForm(targetForm);
    }
  }
}
