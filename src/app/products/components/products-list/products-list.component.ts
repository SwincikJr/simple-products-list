import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListComponent } from '../../../common/components/list/list.component';
import { List } from '../../../common/classes/list.abstract';
import { ProductsListItem } from '../../interfaces/products-list-item.interface';
import { Column } from '../../../common/interfaces/column.interface';

@Component({
  imports: [CommonModule, ListComponent],
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent extends List implements OnInit {
  
  readonly baseRoute: string = 'products';
  
  readonly productColumns: Column[] = [
    { name: 'name', label: 'Nome' },
    { name: 'type', label: 'Tipo' }
  ];

  private _products: ProductsListItem[] = [];

  get products(): ProductsListItem[] { return this._products };
  
  constructor(router: Router, private _productsService: ProductsService) {
    super(router);
  }

  private fillProducts(products: Product[]): void {
    this._products = products.map(p => ({
      id: p.id,
      name: p.name,
      type: p.productType?.description
    } as ProductsListItem));
  }

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: this.fillProducts.bind(this),
      error: err => console.error(err)
    });
  }

  delete(item: any): void {
    const del = confirm(`Tem certeza que deseja deletar o produto ${item.name}?`);
    if (del) this._productsService.deleteProductById(item.id).subscribe({
      next: this.ngOnInit.bind(this),
      error: err => console.error(err)
    });
  }
}
