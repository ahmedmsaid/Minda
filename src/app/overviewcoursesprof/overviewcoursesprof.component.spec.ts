import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewcoursesprofComponent } from './overviewcoursesprof.component';

describe('OverviewcoursesprofComponent', () => {
  let component: OverviewcoursesprofComponent;
  let fixture: ComponentFixture<OverviewcoursesprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewcoursesprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewcoursesprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
