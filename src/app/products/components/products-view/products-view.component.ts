import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductTypesService } from '../../services/product-types.service';
import { Product } from '../../interfaces/product.interface';
import { productsFormEspec as pfe, productsViewExtraEspec } from '../../constants/products.constants';
import { FormEspecItem } from '../../../common/interfaces/form-espec-item.interface';
import { FormComponent } from '../../../common/components/form/form.component';
import { ProductType } from '../../interfaces/productType.interface';
import { FormEspecOption } from '../../../common/interfaces/form-espec-option.interface';

const productsFormEspec = Array.from(pfe);
productsFormEspec.push(productsViewExtraEspec);

@Component({
  imports: [FormComponent],
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.css'
})
export class ProductsViewComponent implements OnInit {
  
  private _id: string = '';

  productsFormData: Partial<Product> = {};
  
  readonly productsFormEspec: FormEspecItem[] = productsFormEspec;
  
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _productTypesService: ProductTypesService
  ) {}

  private fillProductTypeOptions(productTypes: ProductType[]): void {
    this.productsFormEspec[1].options = productTypes.map(t => ({
      value: t.id,
      label: t.description
    } as FormEspecOption))
  }

  private fillProductsFormData(product: Product): void {
    this.productsFormData = {
      name: product.name,
      productTypeId: product.productTypeId,
      createdAt: (new Date(product.createdAt)).toLocaleString()
    }
  }

  private setProperties(params: Params): void {
    this._id = params['id']
    this._productTypesService.getProductTypes().subscribe({
      next: this.fillProductTypeOptions.bind(this),
      error: err => console.error(err)
    })
    this._productsService.getProductById(this._id).subscribe({
      next: this.fillProductsFormData.bind(this),
      error: err => console.error(err)
    })
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: this.setProperties.bind(this),
      error: err => console.error(err)
    })
  }

  onSubmit(product: Partial<Product>) {
    delete product.createdAt;
    this._productsService.updateProductById(this._id, product).subscribe({
      next: _ => this._router.navigateByUrl('products'),
      error: err => console.error(err)
    });
  }
}
