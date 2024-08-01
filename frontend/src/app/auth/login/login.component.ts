import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  activeForm: 'login' | 'register' = 'login';

  cards = [
    { image: 'https://media.istockphoto.com/id/1348860418/vector/green-certified-vector-emblem.jpg?s=612x612&w=0&k=20&c=5JtYhQkD5PZ8aSgJBzDNsun2Q3kfw_u5BuvJJo2VzbA=', text: 'certified cable manufactures since 1985' },
    { image: 'https://static.vecteezy.com/system/resources/previews/013/558/420/original/location-globe-worldwide-pin-marker-flat-color-icon-free-vector.jpg', text: ' global businesses all over the world' },
    { image: 'https://www.mecatechnic.com/img/photos/zoom/TB00364G.jpg', text: 'wiring millions of homes since then' },
  ];
  currentCard = 0;
  autoSlideInterval: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required] 
    });
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextCard();
    }, 3000); 
  }

  stopAutoSlide(): void {
    clearInterval(this.autoSlideInterval);
  }

  prevCard(): void {
    this.stopAutoSlide();
    this.currentCard = (this.currentCard - 1 + this.cards.length) % this.cards.length;
    this.startAutoSlide();
  }

  nextCard(): void {
    this.stopAutoSlide();
    this.currentCard = (this.currentCard + 1) % this.cards.length;
    this.startAutoSlide();
  }

  toggleForm(targetForm: 'login' | 'register') {
    this.activeForm = targetForm;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password, 'customer')
        .subscribe(
          response => {
            console.log(response.access_token);
            localStorage.setItem('token', response.access_token);
            this.router.navigate(['/']);
            this.notificationService.showSuccess('Success', 'Login successful');
          },
          error => {
            this.notificationService.showError('Error', 'Invalid email or password!');
          }
        );
    } else {
     
      this.notificationService.showError('Error', 'Please fill in all fields correctly!');
    }
  }

  register() {
    if (true) {
      const { email, mobileNumber, password, confirmPassword } = this.registerForm.value;
       console.log(password , confirmPassword);
      if (password !== confirmPassword) {
        this.notificationService.showError('Error', 'Passwords do not match!');
        return;
      }
      this.authService.signup(email, mobileNumber, password, 'customer')
        .subscribe(
          response => {
            this.notificationService.showSuccess('Success', 'Registration successful!');
            this.activeForm = 'login';
          },
          error => {
            this.notificationService.showError('Error', 'Registration failed. Please try again.');
          }
        );
    } else {
      this.notificationService.showError('Error', 'Please fill in all fields correctly!');
    }
  }

  notifySuccess() {
    this.notificationService.showSuccess('Success', 'Successfully');
  }

  notifyInfo() {
    this.notificationService.showInfo('Info', 'This is an info message');
  }

  notifyWarn() {
    this.notificationService.showWarn('Warning', 'This is a warning message');
  }

  notifyError() {
    this.notificationService.showError('Error', 'This is an error message');
  }
}
