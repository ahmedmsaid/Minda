import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsAssignmentDegComponent } from './ans-assignment-deg.component';

describe('AnsAssignmentDegComponent', () => {
  let component: AnsAssignmentDegComponent;
  let fixture: ComponentFixture<AnsAssignmentDegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsAssignmentDegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsAssignmentDegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
