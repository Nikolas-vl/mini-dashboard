import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar'
import { from, of } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mini-dashboard');

  data: number = 0;

  constructor() {
    const users = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jack', age: 35 },
      { id: 3, name: 'Mike', age: 25 },
    ];
    const users$ = of(users);

    users$.subscribe((users) => {
      console.log('users', users);
    })
  }
}
