import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    this.loadCartFromLocalStorage();
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage();
  }

  addtoCart(product: any) {
    const existingProductIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      this.cartItemList[existingProductIndex].quantity += product.quantity;
    } else {
      this.cartItemList.push({ ...product, quantity: product.quantity });
    }
  
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.saveCartToLocalStorage();
    console.log(this.cartItemList);
  }

  incrementQuantity(product: any) {
    const existingProductIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex !== -1) {
      this.cartItemList[existingProductIndex].quantity += 1;
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.saveCartToLocalStorage();
    }
  }

  decrementQuantity(product: any) {
    const existingProductIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex !== -1 && this.cartItemList[existingProductIndex].quantity > 1) {
      this.cartItemList[existingProductIndex].quantity -= 1;
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.saveCartToLocalStorage();
    }
  }

  updateQuantity(product: any, quantity: number) {
    const existingProductIndex = this.cartItemList.findIndex((item: any) => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      this.cartItemList[existingProductIndex].quantity = quantity;
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      this.saveCartToLocalStorage();
    }
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.cost * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((item: any) => item.id !== product.id);
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage();
  }

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpenSubject.asObservable();

  setOpenCart(isOpen: boolean) {
    this.cartOpenSubject.next(isOpen);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }

  private loadCartFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItemList = JSON.parse(storedCartItems);
      this.productList.next(this.cartItemList);
    }
  }
}
