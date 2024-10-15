import { Component } from '@angular/core';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description';
import { Router } from '@angular/router';
import { ToDoListItem, ToDoListService } from '../../services';
import { ToDoEditItemComponent } from '../to-do-edit-item/to-do-edit-item.component';

@Component({
    selector: 'app-to-do-list-view',
    standalone: true,
    imports: [ToDoListItemDescriptionComponent, ToDoEditItemComponent],
    templateUrl: './to-do-list-view.component.html',
    styleUrl: './to-do-list-view.component.scss',
})
export class ToDoListViewComponent {
    constructor(
        private _router: Router,
        private _toDoListService: ToDoListService,
    ) {}

    public get isEditing() {
        return this._toDoListService.isEditing;
    }

    public get selectedItemId() {
        return this._router.url.split('/').pop();
    }

    public getSelectedItem(): ToDoListItem | undefined {
        if (!this.selectedItemId) {
            return;
        }

        return this._toDoListService.getItemById(this.selectedItemId);
    }
}
