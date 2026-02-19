import { Component, signal } from '@angular/core';
import { interval, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Todo } from '../todo/todo'
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [Todo],
})
export class Home {
  seconds = signal(0);
  running = signal(false);

  constructor() {
    toObservable(this.running)
      .pipe(
        switchMap(isRunning =>
          isRunning ? interval(1000) : EMPTY
        ),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.seconds.update(s => s + 1);
      });
  }


  start() { this.running.set(true); }
  stop() { this.running.set(false); }
  reset() { this.seconds.set(0); }
}
// const user = signal<User | null>(null);
// const settings = signal<Settings | null>(null);
// const profile = computed(() => ({
//   user: user(),
//   settings: settings(),
// }));
