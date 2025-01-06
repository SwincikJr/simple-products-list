import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductType } from '../../interfaces/productType.interface';
import { ProductTypesService } from '../../services/product-types.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit {
  
  private _productTypes: ProductType[] = [];
  
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    productTypeId: new FormControl('', [Validators.required]),
  });

  get productTypes(): ProductType[] {
    return this._productTypes;
  }

  constructor(
    private _router: Router,
    private _productsServices: ProductsService,
    private _productTypesService: ProductTypesService
  ) {}

  ngOnInit(): void {
    this._productTypesService.getProductTypes().subscribe({
      next: res => this._productTypes = res,
      error: err => console.error(err)
    });
  }

  onSubmit() {
    const product = this.productForm.getRawValue();
    this._productsServices.createProduct(product as Partial<Product>).subscribe({
      next: _ =>  this._router.navigateByUrl('products'),
      error: err => console.error(err)
    })
  }
}
