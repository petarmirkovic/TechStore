import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/Models/product';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product?: Product;
  url: string = '';
  constructor(private shopService: ShopService, private router: Router){}

  ngOnInit(): void {

    this.loadProduct();
  }

  loadProduct(){
    this.url = this.router.url;
    const urlParts: string[] = this.url.split('/');
    const lastPart: string = urlParts[urlParts.length - 1];
    if(lastPart) this.shopService.getProduct(+lastPart).subscribe({
      next: product => this.product = product,
      error: error => console.log(error)
    });
  }
}
