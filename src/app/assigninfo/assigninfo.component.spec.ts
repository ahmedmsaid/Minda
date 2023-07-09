import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigninfoComponent } from './assigninfo.component';

describe('AssigninfoComponent', () => {
  let component: AssigninfoComponent;
  let fixture: ComponentFixture<AssigninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigninfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
