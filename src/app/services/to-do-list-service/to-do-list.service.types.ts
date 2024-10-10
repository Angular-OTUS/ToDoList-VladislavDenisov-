export const STATUS_OPTIONS = {
    inProgress: 'In progress',
    completed: 'Completed',
} as const;

export type ToDoListItemStatus = (typeof STATUS_OPTIONS)[keyof typeof STATUS_OPTIONS];

export interface ToDoListItem {
    // WARNING: https://github.com/typicode/json-server/issues/1473
    id: string;
    name: string;
    status: ToDoListItemStatus;
    description?: string;
}
