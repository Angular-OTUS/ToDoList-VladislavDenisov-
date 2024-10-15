import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListViewComponent } from './to-do-list-view.component';

describe('ToDoListViewComponent', () => {
    let component: ToDoListViewComponent;
    let fixture: ComponentFixture<ToDoListViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToDoListViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToDoListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
