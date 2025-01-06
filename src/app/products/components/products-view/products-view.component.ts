import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductTypesService } from '../../services/product-types.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductType } from '../../interfaces/productType.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent implements OnInit {
  
  private _id: string = '';
  private _formatedCreatedAt: string = '';
  private _productTypes: ProductType[] = [];

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    productTypeId: new FormControl('', [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true })
  });

  get productTypes(): ProductType[] {
    return this._productTypes;
  }

  get formatedCreatedAt(): string {
    return this._formatedCreatedAt;
  }
  
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService
  ) {}

  private setProperties(params: Params): void {
    this._id = params['id']
    this._productTypesService.getProductTypes().subscribe({
      next: res => this._productTypes = res,
      error: err => console.error(err)
    })
    this._productsService.getProductById(this._id).subscribe({
      next: res => { this.productForm.setValue(res); this.formatCreatedAt() },
      error: err => console.error(err)
    })
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: this.setProperties.bind(this),
      error: err => console.error(err)
    })
  }

  onSubmit() {
    const product = this.productForm.getRawValue();
    this._productsService.updateProductById(this._id, product as Partial<Product>).subscribe({
      next: _ => this._router.navigateByUrl('products'),
      error: err => console.error(err)
    });
  }

  formatCreatedAt() {
    this._formatedCreatedAt = (new Date(this.productForm.get('createdAt')?.value || '')).toLocaleString();
  }
}
