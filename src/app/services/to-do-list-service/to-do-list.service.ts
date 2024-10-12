import { inject, Injectable } from '@angular/core';
import { STATUS_OPTIONS, ToDoListItem, ToDoListItemStatus } from './to-do-list.service.types';
import { ApiService } from '../api-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast-service';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToDoListService {
    private _api = inject(ApiService);
    private _toDoList: ToDoListItem[] = [];
    private _selectedItemId: string | null = null;
    private _editedItemId: string | null = null;
    private _isLoading = false;

    constructor(private _toastService: ToastService) {}

    public get toDoList() {
        return this._toDoList;
    }

    public get selectedItemId() {
        return this._selectedItemId;
    }

    public get editedItemId() {
        return this._editedItemId;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public get itemIds() {
        return this._toDoList.map((item) => item.id);
    }

    public getItemById(id: string) {
        return this._toDoList.find((item) => item.id === id);
    }

    public get selectedItem() {
        if (!this.selectedItemId) {
            return;
        }

        return this.getItemById(this.selectedItemId);
    }

    public get editedItem() {
        if (!this.editedItemId) {
            return;
        }

        return this.getItemById(this.editedItemId);
    }

    public setToDoList(toDoList: ToDoListItem[]) {
        this._toDoList = toDoList;
    }

    public setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading;
    }

    public setSelectedItemId(id: string) {
        this._selectedItemId = id;
    }

    public setEditedItemId(id: string) {
        this._editedItemId = id;
    }

    public setItemStatus(item: ToDoListItem, status: ToDoListItemStatus) {
        item.status = status;
    }

    public clearSelectedItemId() {
        this._selectedItemId = null;
    }

    public clearEditedItemId() {
        this._editedItemId = null;
    }

    public toggleItemStatus(id: string) {
        const item = this.getItemById(id);
        if (!item) {
            return;
        }

        if (item.status === STATUS_OPTIONS.completed) {
            this.patchItem({ id, status: STATUS_OPTIONS.inProgress });
        } else {
            this.patchItem({ id, status: STATUS_OPTIONS.completed });
        }
    }

    public getNewItemId() {
        return this.itemIds.length > 0 ? Math.max(...this.itemIds.map((item) => parseInt(item))) + 1 : 0;
    }

    public getToDoList() {
        this.setIsLoading(true);

        this._api
            .getItems()
            .pipe(catchError(this.handleHttpError))
            .subscribe({
                next: (items) => {
                    this.setToDoList(items);
                    this.setIsLoading(false);
                },
            });
    }

    public addItem({ name, description }: Omit<ToDoListItem, 'id' | 'status'>) {
        this.setIsLoading(true);

        this._api
            .addItem({
                id: String(this.getNewItemId()),
                name: name.trim(),
                description: description?.trim(),
                status: STATUS_OPTIONS.inProgress,
            })
            .pipe(catchError(this.handleHttpError))
            .subscribe({
                next: (newItem) => {
                    this._toDoList.push(newItem);
                    this.setIsLoading(false);
                    this._toastService.addToast({
                        message: 'Todo was added!',
                        toastType: 'positive',
                    });
                },
            });
    }

    public patchItem(payload: Required<Pick<ToDoListItem, 'id'>> & Partial<ToDoListItem>) {
        this.setIsLoading(true);

        this._api
            .patchItem(payload)
            .pipe(catchError(this.handleHttpError))
            .subscribe({
                next: (patchedItem) => {
                    const item = this.getItemById(patchedItem.id);
                    if (!item) {
                        return;
                    }
                    Object.assign(item, patchedItem);
                    this.setIsLoading(false);
                    this._toastService.addToast({
                        message: 'Todo was updated!',
                        toastType: 'info',
                    });
                },
            });
    }

    public deleteItem(id: string) {
        this.setIsLoading(true);

        this._api
            .deleteItem({ id })
            .pipe(catchError(this.handleHttpError))
            .subscribe({
                next: () => {
                    if (this.selectedItemId === id) {
                        this.clearSelectedItemId();
                    }
                    this.setIsLoading(false);
                    this._toastService.addToast({
                        message: 'Todo was deleted!',
                        toastType: 'negative',
                    });
                },
            });

        this._toDoList = this._toDoList.filter((item) => item.id !== id);
    }

    public handleHttpError(err: HttpErrorResponse) {
        console.error(err);

        const message = 'Something went wrong. Try again';
        this._toastService.addToast({
            message,
            toastType: 'error',
        });
        this.setIsLoading(false);
        return throwError(() => new Error(message));
    }
}
