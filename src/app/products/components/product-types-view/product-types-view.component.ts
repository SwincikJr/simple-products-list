import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../common/components/form/form.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';
import { productTypeFormEspec as ptfe } from '../../constants/product-types.constants';
import { FormEspecItem } from '../../../common/interfaces/form-espec-item.interface';

const productTypeFormEspec = Array.from(ptfe);
productTypeFormEspec[0].disabled = true;

@Component({
  imports: [FormComponent],
  selector: 'app-product-types-view',
  templateUrl: './product-types-view.component.html',
  styleUrl: './product-types-view.component.css'
})
export class ProductTypesViewComponent implements OnInit {
  
  private _id: string = '';

  productTypeFormData: Partial<ProductType> = {};
  productTypeFormEspec: FormEspecItem[] = productTypeFormEspec;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productTypesService: ProductTypesService
  ) {}

  private setProductTypeFormData(productType: ProductType): void {
    this.productTypeFormData = {
      uid: productType.uid,
      description: productType.description
    }
  }

  private setProperties(params: Params): void {
    this._id = params['id'];
    this._productTypesService.getProductTypeById(this._id).subscribe({
      next: this.setProductTypeFormData.bind(this),
      error: err => console.error(err)
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: this.setProperties.bind(this),
      error: err => console.error(err)
    });
  }

  onSubmit(productType: Partial<ProductType>): void {
    this._productTypesService.updateProductTypesById(this._id, productType).subscribe({
      next: _ => this._router.navigateByUrl('productTypes'),
      error: err => console.error(err)
    });
  }
}
