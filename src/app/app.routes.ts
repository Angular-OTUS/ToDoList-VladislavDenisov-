import { Routes } from '@angular/router';
import { ToDoListComponent, ToDoListViewComponent } from './components';

export const ROUTE_TOKENS = {
    TASKS: 'tasks',
} as const;

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTE_TOKENS.TASKS,
        pathMatch: 'full',
    },
    {
        path: ROUTE_TOKENS.TASKS,
        component: ToDoListComponent,
        children: [
            {
                path: ':id',
                component: ToDoListViewComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/',
    },
];
