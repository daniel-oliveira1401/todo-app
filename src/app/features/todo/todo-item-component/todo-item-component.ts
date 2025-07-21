import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoModel } from '../../../shared/models/todo-model';

@Component({
  selector: 'app-todo-item-component',
  standalone: false,
  templateUrl: './todo-item-component.html',
  styleUrl: './todo-item-component.scss',
})
export class TodoItemComponent {
  @Input({required: true}) todo! : TodoModel;
  
  @Output() removeTodo = new EventEmitter<TodoModel>();
  updateTodo = output<TodoModel>();

  toggleTodo(){
    this.updateTodo.emit({
      ...this.todo,
      completed : !this.todo.completed
    });
  }

  getLabelForCheckbox(){
    return 'Mark todo item as' + this.todo.completed? 'Finalizado' : 'Pendente' ;
  }
}
