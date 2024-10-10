import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ButtonType } from './button.component.types';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [MatButtonModule, CommonModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent extends MatButton {
    @Input() public buttonType: ButtonType = 'flat';
    @Input() public type = 'submit';

    @Output() public clickEvent = new EventEmitter<Event>();

    public click(e: Event) {
        this.clickEvent.emit(e);
    }
}
