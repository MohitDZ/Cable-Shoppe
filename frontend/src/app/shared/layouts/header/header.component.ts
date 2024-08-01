// src/app/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsComponent } from '../../../products/products.component';
import { CommonModule } from '@angular/common';
import * as productsData from '../../../data.json';
import { SharedService } from '../../../services/shared.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule , ProductsComponent , CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  products = (productsData as any).default;

  constructor(private sharedService: SharedService , private cartService : CartService) {}
  
  public totalItem : number = 0;
  public searchTerm !: string;
  
  cartOpen$ = this.cartService.cartOpen$;



  openCart() {
    this.cartService.setOpenCart(true);
  }

  closeCart() {
    this.cartService.setOpenCart(false);
  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

  toggleForm(targetForm: 'login' | 'register') {
    this.sharedService.toggleForm(targetForm);
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
