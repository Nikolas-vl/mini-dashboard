import { describe, it, expect, beforeEach } from 'vitest';
import { Todo } from './todo';

describe('Todo (unit)', () => {
  let comp: Todo;

  beforeEach(() => {
    comp = new Todo();
  });

  it('should have initial todos', () => {
    expect(comp.todos()).toEqual([
      { id: 1, title: 'Learn OnPush', done: false },
      { id: 2, title: 'Optimize list', done: false },
    ]);
  });

  it('toggleTodo should flip done flag for given id', () => {
    comp.toggleTodo(1);
    expect(comp.todos().find(t => t.id === 1)?.done).toBe(true);

    comp.toggleTodo(1);
    expect(comp.todos().find(t => t.id === 1)?.done).toBe(false);
  });

  it('toggleTodo should not affect other items', () => {
    comp.toggleTodo(1);
    expect(comp.todos().find(t => t.id === 2)?.done).toBe(false);
  });
});
