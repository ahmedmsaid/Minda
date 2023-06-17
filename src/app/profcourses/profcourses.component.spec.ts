import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfcoursesComponent } from './profcourses.component';

describe('ProfcoursesComponent', () => {
  let component: ProfcoursesComponent;
  let fixture: ComponentFixture<ProfcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfcoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
