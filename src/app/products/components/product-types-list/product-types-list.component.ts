import { Component, OnInit } from '@angular/core';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-product-types-list',
  templateUrl: './product-types-list.component.html',
  styleUrl: './product-types-list.component.css'
})
export class ProductTypesListComponent implements OnInit {
  
  private _productTypes: ProductType[] = [];

  get productTypes(): ProductType[] {
    return this._productTypes;
  } 

  constructor(private _produtTypesService: ProductTypesService, private _router: Router) {}

  ngOnInit(): void {
    this._produtTypesService.getProductTypes().subscribe({
      next: res => this._productTypes = res,
      error: err => console.error(err)
    })
  }

  create() {
    return this._router.navigateByUrl(`productTypes/new`);
  }

  view(id: string) {
    return this._router.navigateByUrl(`productTypes/${id}`);
  }

  delete(id: string, description: string) {
    const del = confirm(`Tem certeza que deseja deletar o Tipo de Produto ${description} e todos os Produtos deste tipo?`);
    if (del) this._produtTypesService.deleteProductTypeById(id).subscribe({
      next: this.ngOnInit.bind(this),
      error: err => console.error(err)
    })
  }
}
