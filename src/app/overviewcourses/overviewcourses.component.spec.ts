import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewcoursesComponent } from './overviewcourses.component';

describe('OverviewcoursesComponent', () => {
  let component: OverviewcoursesComponent;
  let fixture: ComponentFixture<OverviewcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewcoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
