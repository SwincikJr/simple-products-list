import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../interfaces/productType.interface';
import { ProductTypesService } from '../../services/product-types.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { FormEspecItem } from '../../../common/interfaces/form-espec-item.interface';
import { FormEspecOption } from '../../../common/interfaces/form-espec-option.interface';
import { FormComponent } from '../../../common/components/form/form.component';
import { productsFormEspec } from '../../constants/products.constants';

@Component({
  imports: [FormComponent],
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit {

  readonly productsFormData: Partial<Product> = {};
  
  readonly productsFormEspec: FormEspecItem[] = productsFormEspec;

  constructor(
    private _router: Router,
    private _productsServices: ProductsService,
    private _productTypesService: ProductTypesService
  ) {}

  private fillProductTypesOption(productTypes: ProductType[]): void {
    this.productsFormEspec[1].options = productTypes.map(t => ({
      value: t.id,
      label: t.description
    } as FormEspecOption))
  }

  ngOnInit(): void {
    this._productTypesService.getProductTypes().subscribe({
      next: this.fillProductTypesOption.bind(this),
      error: err => console.error(err)
    });
  }

  onSubmit(product: Partial<Product>): void {
    this._productsServices.createProduct(product).subscribe({
      next: _ =>  this._router.navigateByUrl('products'),
      error: err => console.error(err)
    })
  }
}
