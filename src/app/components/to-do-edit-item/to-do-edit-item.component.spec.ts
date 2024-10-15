import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoEditItemComponent } from './to-do-edit-item.component';

describe('ToDoEditItemComponent', () => {
    let component: ToDoEditItemComponent;
    let fixture: ComponentFixture<ToDoEditItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToDoEditItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoEditItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
