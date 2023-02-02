import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Increasing', value: 'priceAsc'},
    {name: 'Price: Decreasing', value: 'priceDesc'}
  ];
  totalCount = 0;

  constructor(private shopService: ShopService){}
  
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe( response => {
      next:{
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }
      error: console.log("something went wrong while loading products");
    });
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      next: this.brands = [{id: 0, name: 'All'}, ... response];
      error: console.log("something went wrong while loading brands");
    });
  }
  getTypes(){
    this.shopService.getTypes().subscribe(response=>{
      next: this.types = [{id: 0, name: 'All'}, ... response];
      error: console.log('something went wrong');
    });
  }
  
  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch()
  {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset()
  {
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
