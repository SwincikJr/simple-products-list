import { Injectable } from '@angular/core';
import { BackendService } from '../../common/services/backend.service';
import { ProductType } from '../interfaces/productType.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService extends BackendService {
  getProductTypes(): Observable<ProductType[]> {
    return this.get('productTypes');
  }
}
