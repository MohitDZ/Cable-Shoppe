import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;
  constructor(private cartService: CartService) { }
  cartOpen$ = this.cartService.cartOpen$;

  openCart() {
    this.cartService.setOpenCart(true);
  }

  closeCart() {
    this.cartService.setOpenCart(false);
  }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      });

   
    this.cartService.productList.subscribe(() => {
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  incrementQuantity(item: any) {
    this.cartService.incrementQuantity(item);
  }

  decrementQuantity(item: any) {
    this.cartService.decrementQuantity(item);
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
