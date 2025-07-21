import { Component, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { TodoModel } from '../../shared/models/todo-model';
import { TodoService } from '../../core/services/todo-service';
import { TodoItemComponent } from './components/todo-item-component/todo-item-component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-component',
  imports: [
    TodoItemComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './todo-component.html',
  styleUrl: './todo-component.scss'
})
export class TodoComponent implements OnInit {
  // Usar inject() ao invés de constructor para injetar coisas no component
  // https://angular.dev/style-guide#prefer-the-inject-function-over-constructor-parameter-injection
  todoService : TodoService = inject(TodoService);

  todos : Signal<TodoModel[]> = this.todoService.getTodos();

  titleFormControl : FormControl<string | null> = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.todoService.listTodos();
  }

  addTodo(event : Event){
    event.preventDefault();
    if(this.titleFormControl.valid){
      const title = this.titleFormControl.value ?? '';
      this.todoService.addTodo(title);
      this.titleFormControl.setValue('');
    }
  }

  removeTodo(todo : TodoModel){
    this.todoService.removeTodo(todo.id);
  }

  updateTodo(todo : TodoModel){
    this.todoService.updateTodo(todo);
  }

}
