import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupprofComponent } from './signupprof.component';

describe('SignupprofComponent', () => {
  let component: SignupprofComponent;
  let fixture: ComponentFixture<SignupprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
