import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursesComponent } from './edit-courses.component';

describe('EditCoursesComponent', () => {
  let component: EditCoursesComponent;
  let fixture: ComponentFixture<EditCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
