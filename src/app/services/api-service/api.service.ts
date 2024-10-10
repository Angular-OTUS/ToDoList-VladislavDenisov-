import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ToDoListItem } from '../to-do-list-service';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private _baseUrl = new URL('http://localhost:3000/items');
    private _http = inject(HttpClient);
    // Slowing down requests in order to demonstrate project features
    private _customDelay<T>(due = 500) {
        return delay<T>(due);
    }

    getItems(): Observable<ToDoListItem[]> {
        return this._http.get<ToDoListItem[]>(this._baseUrl.href).pipe(this._customDelay());
    }

    addItem(payload: ToDoListItem): Observable<ToDoListItem> {
        return this._http.post<ToDoListItem>(this._baseUrl.href, payload).pipe(this._customDelay());
    }

    patchItem(payload: Required<Pick<ToDoListItem, 'id'>> & Partial<ToDoListItem>) {
        const url = new URL(this._baseUrl);
        url.pathname = [url.pathname, payload.id].join('/');

        return this._http.patch<ToDoListItem>(url.href, payload).pipe(this._customDelay());
    }

    deleteItem(payload: Pick<ToDoListItem, 'id'>) {
        const url = new URL(this._baseUrl);
        url.pathname = [url.pathname, payload.id].join('/');

        return this._http.delete<ToDoListItem>(url.href).pipe(this._customDelay());
    }
}
