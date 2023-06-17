import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginprofComponent } from './loginprof.component';

describe('LoginprofComponent', () => {
  let component: LoginprofComponent;
  let fixture: ComponentFixture<LoginprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
