import { Component, input, output } from '@angular/core';
import { TodoModel } from '../../../../shared/models/todo-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item-component',
  imports: [
    CommonModule
  ],
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent {
  todo = input.required<TodoModel>();
  
  removeTodo = output<TodoModel>();
  updateTodo = output<TodoModel>();

  toggleTodo(){
    this.updateTodo.emit({
      ...this.todo(),
      completed : !this.todo().completed
    });
  }
}
