import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BackendService } from '../../common/services/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BackendService {
  getProducts(): Observable<Product[]> {
    return this.get('products?_embed=productType&_sort=name');
  }

  getProductById(id: string): Observable<Product> {
    return this.get(`products/${id}`);
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    product.createdAt = (new Date()).toISOString()
    return this.post('products', product);
  }

  updateProductById(id: string, product: Partial<Product>): Observable<Product> {
    return this.put(`products/${id}`, product);
  }

  deleteProductById(id: string): Observable<any> {
    return this.delete(`products/${id}`);
  }
}
