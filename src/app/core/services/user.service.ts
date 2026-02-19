import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly api = inject(ApiService);

  private readonly usersSignal = signal<User[]>([]);

  readonly users = this.usersSignal.asReadonly();

  loadUsers() {
    this.api
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(users => {
        this.usersSignal.set(users);
      });
  }
}
