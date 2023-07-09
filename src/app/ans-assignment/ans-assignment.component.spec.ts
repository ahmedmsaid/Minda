import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsAssignmentComponent } from './ans-assignment.component';

describe('AnsAssignmentComponent', () => {
  let component: AnsAssignmentComponent;
  let fixture: ComponentFixture<AnsAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
