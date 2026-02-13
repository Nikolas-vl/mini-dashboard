import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly api = inject(ApiService);

  readonly users = toSignal(
    this.api.get<User[]>('https://jsonplaceholder.typicode.com/users'),
    { initialValue: [] }
  );
}
