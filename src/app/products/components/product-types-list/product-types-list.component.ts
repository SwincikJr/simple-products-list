import { Component, OnInit } from '@angular/core';
import { ProductTypesService } from '../../services/product-types.service';
import { ProductType } from '../../interfaces/productType.interface';
import { Router } from '@angular/router';
import { ListComponent } from '../../../common/components/list/list.component';
import { List } from '../../../common/classes/list.abstract';
import { Column } from '../../../common/interfaces/column.interface';

@Component({
  imports: [ListComponent],
  selector: 'app-product-types-list',
  templateUrl: './product-types-list.component.html',
  styleUrl: './product-types-list.component.css'
})
export class ProductTypesListComponent extends List implements OnInit {

  readonly baseRoute: string = 'productTypes';
  
  readonly productTypeColumns: Column[] = [
    { name: 'uid', label: 'UID' },
    { name: 'description', label: 'Descrição' }
  ]
  
  private _productTypes: ProductType[] = [];
  
  get productTypes(): ProductType[] { return this._productTypes; }

  constructor(router: Router, private _produtTypesService: ProductTypesService) {
    super(router);
  }

  ngOnInit(): void {
    this._produtTypesService.getProductTypes().subscribe({
      next: res => this._productTypes = res,
      error: err => console.error(err)
    })
  }

  delete(item: any) {
    const del = confirm(`Tem certeza que deseja deletar o Tipo de Produto ${item.description} e todos os Produtos deste tipo?`);
    if (del) this._produtTypesService.deleteProductTypeById(item.id).subscribe({
      next: this.ngOnInit.bind(this),
      error: err => console.error(err)
    })
  }
}
