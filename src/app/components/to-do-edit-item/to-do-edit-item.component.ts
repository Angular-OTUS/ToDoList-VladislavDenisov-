import { Component, Input, OnChanges } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    FormControl,
    Validators,
    FormGroup,
    FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '../../ui';
import { noWhitespaceValidator } from '../../utils';
import { ToDoListItem, ToDoListService } from '../../services';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-to-do-edit-item',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, ButtonComponent],
    templateUrl: './to-do-edit-item.component.html',
    styleUrl: './to-do-edit-item.component.scss',
})
export class ToDoEditItemComponent implements OnChanges {
    @Input() public toDoListItem?: ToDoListItem;

    constructor(private _toDoListService: ToDoListService) {}

    public editItemForm = new FormGroup<{
        name: FormControl<string | null>;
    }>({
        name: new FormControl('', [Validators.required, noWhitespaceValidator]),
    });

    public cancelEditing(formDirective: FormGroupDirective) {
        this._toDoListService.setIsEditing(false);
        formDirective.resetForm();
    }

    public setEditItemFormDefaultValue() {
        if (!this.toDoListItem?.name) {
            return;
        }

        this.editItemForm.controls.name.patchValue(this.toDoListItem.name);
    }

    public onEditItemFormSubmit(formDirective: FormGroupDirective) {
        if (!this.editItemForm.value.name || !this.toDoListItem?.id) {
            return;
        }

        this._toDoListService.patchItem({
            name: this.editItemForm.value.name,
            id: this.toDoListItem.id,
        });

        this._toDoListService.setIsEditing(false);
        formDirective.resetForm();
    }

    ngOnChanges() {
        this.setEditItemFormDefaultValue();
    }
}
