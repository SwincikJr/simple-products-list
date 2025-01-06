import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-product-types-create',
  templateUrl: './product-types-create.component.html',
  styleUrl: './product-types-create.component.css'
})
export class ProductTypesCreateComponent {

  productTypeForm = new FormGroup({
    uid: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

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

  onSubmit(): void {
    const productType = this.productTypeForm.getRawValue();
    this._productTypesService.getProductTypeByUid(productType.uid as string).subscribe({
      next: res => !res.length ? this.createProductType(productType as Partial<ProductType>) : alert(`Este UID já está em uso.`),
      error: err => console.error(err)
    })
  }
}
