import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControllerComponent } from './admin-controller.component';

describe('AdminControllerComponent', () => {
  let component: AdminControllerComponent;
  let fixture: ComponentFixture<AdminControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
