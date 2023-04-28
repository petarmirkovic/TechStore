import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/Models/product';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { last, take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;
  url: string = '';
  constructor(private shopService: ShopService, private router: Router, private bcService: BreadcrumbService, private basketService: BasketService) {
    this.bcService.set('@product-details', ' ')
  }

  ngOnInit(): void {

    this.loadProduct();
  }

  loadProduct(){
    this.url = this.router.url;
    const urlParts: string[] = this.url.split('/');
    const lastPart: string = urlParts[urlParts.length - 1];
    if(lastPart) this.shopService.getProduct(+lastPart).subscribe({
      next: product => {
        this.product = product;
        this.bcService.set('@product-details', product.name);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket=>{
            const item = basket?.items.find(x=>x.id===(+lastPart));
            if(item){
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        })
      },
      error: error => console.log(error)
    });
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    this.quantity--;
  }

  updateBasket(){
    if(this.product){
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = this.quantity-this.quantityInBasket;
        this.quantityInBasket+=itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      }else{
        const itemsToRemove = this.quantityInBasket-this.quantity;
        this.quantityInBasket = this.quantity;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText(){
    return this.quantityInBasket ===0 ? 'Add to basket' : 'Update basket'
  }
}
