import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpassDocComponent } from './forgetpass-doc.component';

describe('ForgetpassDocComponent', () => {
  let component: ForgetpassDocComponent;
  let fixture: ComponentFixture<ForgetpassDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetpassDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetpassDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
