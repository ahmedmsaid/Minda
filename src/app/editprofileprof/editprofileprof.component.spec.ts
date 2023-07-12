import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileprofComponent } from './editprofileprof.component';

describe('EditprofileprofComponent', () => {
  let component: EditprofileprofComponent;
  let fixture: ComponentFixture<EditprofileprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofileprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofileprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
