import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroupDirective } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToDoListService } from '../../services';
import { ToDoListItemComponent } from '../to-do-list-item';
import { ButtonComponent } from '../../ui';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description';
import { SharedModule } from '../../modules';
import { STATUS_OPTIONS, ToDoListItem } from '../../services/to-do-list-service/to-do-list.service.types';
import { ALL_SELECT_OPTION, ItemSelectOption } from './to-do-list.component.types';
import { ToDoCreateItemComponent } from '../to-do-create-item';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatInputModule,
        MatSelectModule,
        ToDoListItemComponent,
        ToDoCreateItemComponent,
        ToDoListItemDescriptionComponent,
        ButtonComponent,
        SharedModule,
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
    public itemSelectOptions: ItemSelectOption[] = [ALL_SELECT_OPTION, ...Object.values(STATUS_OPTIONS)];
    public selectedOption: ItemSelectOption = this.itemSelectOptions[0];

    constructor(
        private _toDoListService: ToDoListService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {}

    public get toDoList(): ToDoListItem[] {
        return this._toDoListService.toDoList;
    }

    public get isEditing() {
        return this._toDoListService.isEditing;
    }

    public get isLoading() {
        return this._toDoListService.isLoading;
    }

    public get selectedItemId() {
        return this._router.url.split('/').pop();
    }

    public get filteredToDoList(): ToDoListItem[] {
        if (this.selectedOption === ALL_SELECT_OPTION) {
            return this.toDoList;
        }

        return this.toDoList.filter((item) => item.status === this.selectedOption);
    }

    public getIsItemSelected(id: string) {
        return this.selectedItemId === id;
    }

    public getIsItemChecked(id: string) {
        const item = this._toDoListService.getItemById(id);
        if (!item) {
            return false;
        }

        return item.status === STATUS_OPTIONS.completed;
    }

    public setIsEditing(isEditing: boolean) {
        this._toDoListService.setIsEditing(isEditing);
    }

    public toggleItemStatus(id: string) {
        this._toDoListService.toggleItemStatus(id);
    }

    public cancelEditing(formDirective: FormGroupDirective) {
        this.setIsEditing(false);
        formDirective.resetForm();
    }

    public deleteItem(id: string) {
        this._toDoListService.deleteItem(id);
    }

    public goToItem(id: string) {
        this._router.navigate([id], { relativeTo: this._route });
    }

    ngOnInit() {
        this._toDoListService.getToDoList();
    }
}
