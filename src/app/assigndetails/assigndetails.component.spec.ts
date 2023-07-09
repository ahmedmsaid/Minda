import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndetailsComponent } from './assigndetails.component';

describe('AssigndetailsComponent', () => {
  let component: AssigndetailsComponent;
  let fixture: ComponentFixture<AssigndetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigndetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigndetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
