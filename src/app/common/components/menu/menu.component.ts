import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor (private _router: Router) {}

  public navigate(to: string) {
    return this._router.navigateByUrl(to);
  }
}
