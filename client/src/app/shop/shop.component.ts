import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/Models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/Models/type';
import { Brand } from '../shared/Models/brand';
import { shopParams } from '../shared/Models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new shopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ]
  totalCount: number = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        if(this.shopParams.sort != 'priceDesc')
          this.products = response.data;
        else
          this.products = response.data.reverse();

        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{id:0, name: 'All'}, ...response]),
      error: (error) => console.log(error),
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{id:0, name: 'All'}, ...response]),
      error: (error) => console.log(error),
    });
  }
  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }
  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }
  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value='';
    this.shopParams = new shopParams();
    this.getProducts();
  }
}
