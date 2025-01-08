import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', './menu.component.css-mobile.css']
})
export class MenuComponent {

  isHovered = false;

  constructor(private router: Router) {}

  get currentRoute() {
    return this.router.url;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
