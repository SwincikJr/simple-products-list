import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BackendService } from '../../common/services/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BackendService {
  getProducts(): Observable<Product[]> {
    return this.get('products');
  }
}
