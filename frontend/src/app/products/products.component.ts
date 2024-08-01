import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as productsData from '../data.json';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products = (productsData as any).default;
  public items: any = [];
  

  constructor( private cartService : CartService , private notificationService: NotificationService) { }

  ngOnInit(): void {
  }


  addToCart(product: any) {
 
    if (product.quantity && product.quantity > 0) {
      this.cartService.addtoCart(product);
      this.notifySuccess();
    } else {
        this.notifyError();
      
    }
  }

 
  notifySuccess() {
    this.notificationService.showSuccess('Success', 'Added to Cart');
  }
  notifyError() {
    this.notificationService.showError('Error', 'Enter Valid Quantity');
  }




}
