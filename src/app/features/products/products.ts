import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsToolbarComponent } from './components/products-toolbar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterOutlet, ProductsToolbarComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {}
