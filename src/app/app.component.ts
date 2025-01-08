import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './common/components/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.css-mobile.css']
})
export class AppComponent {
  title = 'Meus Produtos';
}
