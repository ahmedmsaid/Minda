import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlectureComponent } from './addlecture.component';

describe('AddlectureComponent', () => {
  let component: AddlectureComponent;
  let fixture: ComponentFixture<AddlectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlectureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
