import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { noWhitespaceValidator } from '../../utils';
import { ToastService, ToDoListService } from '../../services';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../modules';
import { ButtonComponent } from '../../ui';

@Component({
    selector: 'app-to-do-create-item',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        ButtonComponent,
        SharedModule,
    ],
    templateUrl: './to-do-create-item.component.html',
    styleUrl: './to-do-create-item.component.scss',
})
export class ToDoCreateItemComponent {
    constructor(
        private _toDoListService: ToDoListService,
        private _toastService: ToastService,
    ) {}

    public addItemForm = new FormGroup({
        name: new FormControl('', [Validators.required, noWhitespaceValidator]),
        description: new FormControl(''),
    });

    public onAddItemFormSubmit(formDirective: FormGroupDirective) {
        if (!this.addItemForm.value.name || !this.addItemForm.value.description) {
            return;
        }

        this._toDoListService.addItem({
            name: this.addItemForm.value.name,
            description: this.addItemForm.value.description,
        });

        formDirective.resetForm();
    }
}
