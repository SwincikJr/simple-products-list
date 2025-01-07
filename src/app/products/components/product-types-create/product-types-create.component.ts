import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';
import { FormComponent } from '../../../common/components/form/form.component';
import { FormEspecItem } from '../../../common/interfaces/form-espec-item.interface';
import { productTypeFormEspec } from '../../constants/product-types.constants';

@Component({
  imports: [FormComponent],
  selector: 'app-product-types-create',
  templateUrl: './product-types-create.component.html',
  styleUrl: './product-types-create.component.css'
})
export class ProductTypesCreateComponent {

  productTypeFormData: Partial<ProductType> = {};
  productTypeFormEspec: FormEspecItem[] = productTypeFormEspec;

  constructor(
    private _router: Router, 
    private _productTypesService: ProductTypesService
  ) {}

  private createProductType(productType: Partial<ProductType>) {
    this._productTypesService.createProductType(productType).subscribe({
      next: _ => this._router.navigateByUrl('productTypes'),
      error: err => console.error(err)
    });
  }

  onSubmit(productType: Partial<ProductType>): void {
    this._productTypesService.getProductTypeByUid(productType.uid!).subscribe({
      next: res => !res.length ? this.createProductType(productType) : alert(`Este UID já está em uso.`),
      error: err => console.error(err)
    })
  }
}
