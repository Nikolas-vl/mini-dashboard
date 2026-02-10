import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) { }

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  getUserById(id: number): Observable<User> {
    return this.api.get<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
