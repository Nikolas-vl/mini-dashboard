import {
  Component,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-users',
  template: `
    <section aria-labelledby="users-title">
      <h2 id="users-title">Users</h2>

      @for (user of users(); track user.id) {
        <article class="user-card">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
        </article>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'users-container'
  }
})
export class Users {
  private readonly userService = inject(UserService);

  readonly users = this.userService.users;
}
