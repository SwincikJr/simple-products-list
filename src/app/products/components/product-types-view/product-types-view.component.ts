import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-product-types-view',
  templateUrl: './product-types-view.component.html',
  styleUrl: './product-types-view.component.css'
})
export class ProductTypesViewComponent implements OnInit {

  private _id: string = '';

  productTypeForm = new FormGroup({
    id: new FormControl(''),
    uid: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', [Validators.required])
  });

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productTypesService: ProductTypesService
  ) {}

  private setProperties(params: Params): void {
    this._id = params['id'];
    this._productTypesService.getProductTypeById(this._id).subscribe({
      next: res => this.productTypeForm.setValue(res),
      error: err => console.error(err)
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: this.setProperties.bind(this),
      error: err => console.error(err)
    });
  }

  onSubmit() {
    const productType = this.productTypeForm.getRawValue();
    this._productTypesService.updateProductTypesById(this._id, productType as Partial<ProductType>).subscribe({
      next: _ => this._router.navigateByUrl('productTypes'),
      error: err => console.error(err)
    });
  }
}
