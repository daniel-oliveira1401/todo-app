import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'todos',
        loadChildren: () => import('./features/todo/todo-module').then(c => c.TodoModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todos'
    }
];
