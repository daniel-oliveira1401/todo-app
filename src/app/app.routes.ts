import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todos',
        loadComponent: () => import('./features/todo-component/todo-component').then(c => c.TodoComponent)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos'
    }
];
