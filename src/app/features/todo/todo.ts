import { ChangeDetectionStrategy, Component, signal } from '@angular/core';


interface TodoItem {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Todo {
  readonly todos = signal<TodoItem[]>([
    { id: 1, title: 'Learn OnPush', done: false },
    { id: 2, title: 'Optimize list', done: false },
  ]);

  toggleTodo(id: number): void {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

}
