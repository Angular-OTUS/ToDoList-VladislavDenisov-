import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../ui';
import { SharedModule } from '../../modules';
import { ToDoListItem } from '../../services';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, ButtonComponent, SharedModule],
    templateUrl: './to-do-list-item.component.html',
    styleUrls: ['../../app.component.scss', './to-do-list-item.component.scss'],
})
export class ToDoListItemComponent {
    @Input() public item?: ToDoListItem;
    @Input() public isSelected = false;
    @Input() public isChecked = false;

    @Output() public goToItemEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public setIsEditingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public toggleItemStatusEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public deleteItemEvent: EventEmitter<string> = new EventEmitter<string>();

    public goToItem(id?: string) {
        this.goToItemEvent.emit(id);
    }

    public setIsEditing(isEditing?: boolean) {
        this.setIsEditingEvent.emit(isEditing);
    }

    public toggleItemStatus(e: Event, id?: string) {
        e.stopPropagation();
        this.toggleItemStatusEvent.emit(id);
    }

    public deleteItem(e: Event, id?: string) {
        e.stopPropagation();
        this.deleteItemEvent.emit(id);
    }
}
