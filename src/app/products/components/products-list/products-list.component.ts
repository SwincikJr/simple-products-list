import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  private _products: Product[] = [];

  get products(): Product[] {
    return this._products;
  }

  constructor(private _productsService: ProductsService, private _router: Router) {}

  async ngOnInit(): Promise<void> {
    this._productsService.getProducts().subscribe({
      next: res => this._products = res,
      error: err => console.error(err)
    });
  }

  create() {
    return this._router.navigateByUrl(`products/new`);
  }

  view(id: string) {
    return this._router.navigateByUrl(`products/${id}`);
  }

  delete(id: string, name: string) {
    const del = confirm(`Tem certeza que deseja deletar o produto ${name}?`);
    if (del) this._productsService.deleteProductById(id).subscribe({
      next: this.ngOnInit.bind(this),
      error: err => console.error(err)
    });
  }
}
