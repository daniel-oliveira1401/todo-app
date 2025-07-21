import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item-component/todo-item-component';
import { TodoComponent } from './todo-component';
import { TodoRoutingModule } from './todo-module.routing';



@NgModule({
  declarations: [
    TodoItemComponent,
    TodoComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
