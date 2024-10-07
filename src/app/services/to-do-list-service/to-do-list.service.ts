import { Injectable } from '@angular/core';
import { ToDoListItem, ToDoListItemStatus } from './to-do-list.service.types';

@Injectable({
    providedIn: 'root',
})
export class ToDoListService {
    private _toDoList: ToDoListItem[] = [
        {
            id: 0,
            title: 'Task1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            status: 'inProgress',
        },
        {
            id: 1,
            title: 'Task2',
            status: 'completed',
        },
        {
            id: 2,
            title: 'Task3',
            status: 'inProgress',
        },
    ];

    private _selectedItemId: number | null = null;
    private _editedItemId: number | null = null;

    public get toDoList() {
        return this._toDoList;
    }

    public get selectedItemId() {
        return this._selectedItemId;
    }

    public get editedItemId() {
        return this._editedItemId;
    }

    public get itemIds() {
        return this._toDoList.map((item) => item.id);
    }

    public get selectedItem() {
        return this._toDoList.find((item) => item.id === this.selectedItemId);
    }

    public get editedItem() {
        return this._toDoList.find((item) => item.id === this._editedItemId);
    }

    public setSelectedItemId(id: number) {
        this._selectedItemId = id;
    }

    public setEditedItemId(id: number) {
        this._editedItemId = id;
    }

    public setItemStatus(item: ToDoListItem, status: ToDoListItemStatus) {
        item.status = status;
    }

    public toggleItemStatus(id: number) {
        const item = this._toDoList.find((item) => item.id === id)!;
        if (item.status === 'completed') {
            this.setItemStatus(item, 'inProgress');
        } else {
            this.setItemStatus(item, 'completed');
        }
    }

    public clearSelectedItemId() {
        this._selectedItemId = null;
    }

    public clearEditedItemId() {
        this._editedItemId = null;
    }

    public addItem({ title, description }: Omit<ToDoListItem, 'id' | 'status'>) {
        const newItemId = this.itemIds.length > 0 ? Math.max(...this.itemIds) + 1 : 0;

        this._toDoList.push({
            id: newItemId,
            title: title.trim(),
            description: description?.trim(),
            status: 'inProgress',
        });
    }

    public patchItem({ title }: { title: string }) {
        this.selectedItem!.title = title;
    }

    public deleteItem(id: number) {
        if (this.selectedItemId === id) {
            this.clearSelectedItemId();
        }
        this._toDoList = this._toDoList.filter((item) => item.id !== id);
    }
}
