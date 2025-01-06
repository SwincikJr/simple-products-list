import { Injectable } from '@angular/core';
import { BackendService } from '../../common/services/backend.service';
import { ProductType } from '../interfaces/productType.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService extends BackendService {
  getProductTypes(): Observable<ProductType[]> {
    return this.get('productTypes?_sort=description');
  }

  getProductTypeById(id: string): Observable<ProductType> {
    return this.get(`productTypes/${id}`);
  }

  getProductTypeByUid(uid: string): Observable<ProductType[]> {
    return this.get(`productTypes?uid=${uid}`);
  }

  createProductType(productType: Partial<ProductType>): Observable<ProductType> {
    return this.post('productTypes', productType);
  }

  updateProductTypesById(id: string, productType: Partial<ProductType>): Observable<ProductType> {
    return this.put(`productTypes/${id}`, productType);
  }

  deleteProductTypeById(id: string): Observable<any> {
    return this.delete(`productTypes/${id}?_dependent=products`);
  }
}
