import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addlecture2Component } from './addlecture2.component';

describe('Addlecture2Component', () => {
  let component: Addlecture2Component;
  let fixture: ComponentFixture<Addlecture2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addlecture2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addlecture2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
