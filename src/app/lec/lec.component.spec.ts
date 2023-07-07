import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecComponent } from './lec.component';

describe('LecComponent', () => {
  let component: LecComponent;
  let fixture: ComponentFixture<LecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
