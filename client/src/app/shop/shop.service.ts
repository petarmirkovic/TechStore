import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/pagination';
import { Product } from '../shared/Models/product';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';
import { shopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/skinet/';
  constructor(private http: HttpClient) {}
  getProducts(shopParams: shopParams) {
    let params = new HttpParams();
    if (shopParams.brandId > 0)
      params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId) params = params.append('typeId', shopParams.typeId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if (shopParams.search) params = params.append('search', shopParams.search);
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'product', {
      params,
    });
  }
  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'product/' + id);
  }
  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'product/brands');
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'product/types');
  }
}
