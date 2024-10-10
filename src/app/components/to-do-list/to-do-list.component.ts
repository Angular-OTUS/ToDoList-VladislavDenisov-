import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    FormControl,
    Validators,
    ReactiveFormsModule,
    FormGroup,
    FormGroupDirective,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToDoListService } from '../../services';
import { ToDoListItemComponent } from '../to-do-list-item';
import { noWhitespaceValidator } from '../../utils';
import { ButtonComponent } from '../../ui';
import { ToDoListItemDescriptionComponent } from '../to-do-list-item-description';
import { SharedModule } from '../../modules';
import { STATUS_OPTIONS } from '../../services/to-do-list-service/to-do-list.service.types';
import { ALL_SELECT_OPTION } from './to-do-list.component.const';
import { ToDoCreateItemComponent } from '../to-do-create-item';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
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
    private _isEditing = false;

    public itemSelectOptions = [ALL_SELECT_OPTION, ...Object.values(STATUS_OPTIONS)];
    public selectedOption = this.itemSelectOptions[0];

    constructor(private _toDoListService: ToDoListService) {}

    public get isEditing() {
        return this._isEditing;
    }

    public get toDoList() {
        return this._toDoListService.toDoList;
    }

    public get isLoading() {
        return this._toDoListService.isLoading;
    }

    public get filteredToDoList() {
        if (this.selectedOption === ALL_SELECT_OPTION) {
            return this.toDoList;
        }
        return this.toDoList.filter((item) => item.status === this.selectedOption);
    }

    public get selectedItem() {
        return this._toDoListService.selectedItem;
    }

    public getIsItemSelected(id: string) {
        return this._toDoListService.selectedItemId === id;
    }

    public getIsItemChecked(id: string) {
        const item = this._toDoListService.getItemById(id);
        if (!item) {
            return false;
        }

        return item.status === STATUS_OPTIONS.completed;
    }

    public setSelectedItemId(id: string) {
        this._toDoListService.setSelectedItemId(id);
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

    public editItemForm = new FormGroup({
        name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    });

    public setIsEditing(isEditing: boolean) {
        this._isEditing = isEditing;
    }

    public setEditItemFormDefaultValue() {
        this.editItemForm.controls.name.patchValue(this.selectedItem?.name || '');
    }

    public onEditItemFormSubmit(formDirective: FormGroupDirective) {
        if (!this.editItemForm.value.name || !this.selectedItem?.id) {
            return;
        }

        this._toDoListService.patchItem({
            id: this.selectedItem.id,
            name: this.editItemForm.value.name,
        });

        this.setIsEditing(false);
        formDirective.resetForm();
    }

    ngOnInit() {
        this._toDoListService.getToDoList();
    }
}
