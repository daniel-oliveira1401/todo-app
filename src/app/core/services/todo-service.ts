import { Injectable, signal } from '@angular/core';
import { TodoModel } from '../../shared/models/todo-model';
import { map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private todos = signal<TodoModel[]>([]);
  
  getTodos(){
    return this.todos.asReadonly();
  }

  addTodo(title : string){
    const todo = new TodoModel(
      crypto.randomUUID(),
      title,
      false
    );
    this.persistTodo(todo);
    this.listTodos();
  }

  removeTodo(id : string){
    this.removeTodoFromPersistance(id);
    this.listTodos();
  }

  updateTodo(todo : TodoModel){
    this.persistTodoUpdate(todo);
    this.listTodos();
  }

  listTodos(){
    
    this.readTodosFromPersistence().pipe(take(1)).subscribe((todos)=> {
      this.todos.set(todos);
    });
    
  }

  private readTodosFromPersistence() : Observable<TodoModel[]>{
    return of(localStorage.getItem('todos')).pipe(map((rawTodos)=>{
      if(rawTodos){
        return JSON.parse(rawTodos);
      }

      return [];
        
    }));
  }

  private persistTodo(todo : TodoModel){
    this.readTodosFromPersistence().subscribe((todos)=>{
      todos.push(todo);
      this.saveTodos(todos);
    })
  }

  private saveTodos(todos : TodoModel[]){
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private persistTodoUpdate(todo : TodoModel){
    this.readTodosFromPersistence().subscribe((todos)=>{
      const updatedTodos = todos.map((t)=>{
        if(t.id == todo.id){
          t.completed = todo.completed;
          t.title = todo.title;
        }

        return t;
      });

      this.saveTodos(updatedTodos);
    })
  }

  private removeTodoFromPersistance(id : string){
    this.readTodosFromPersistence().subscribe((todos)=>{
      const updatedTodos = todos.filter((t) => t.id != id);
      this.saveTodos(updatedTodos);
    });
  }



}
