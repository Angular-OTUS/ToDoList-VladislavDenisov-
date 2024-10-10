import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToDoListItem } from '../../services';

@Component({
    selector: 'app-to-do-list-item-description',
    standalone: true,
    imports: [MatCardModule],
    templateUrl: './to-do-list-item-description.component.html',
    styleUrl: './to-do-list-item-description.component.scss',
})
export class ToDoListItemDescriptionComponent {
    @Input() public toDoListItem?: ToDoListItem;
}
