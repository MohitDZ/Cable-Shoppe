import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { AuthModule } from "./auth/auth.module";
import { LoginComponent } from "./auth/login/login.component";
import { ProductsComponent } from "./products/products.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from './services/notification.service';
import { CartService } from './services/cart.service';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent , CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HeaderComponent,
    AuthModule,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    BrowserAnimationsModule,
    BrowserModule,
    CarouselModule,
    ToastModule,
    BrowserAnimationsModule,
    FooterComponent,
    FormsModule,
    HttpClientModule,
    
],
  providers: [
    provideAnimationsAsync() , MessageService , NotificationService , CartService , AuthService
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
