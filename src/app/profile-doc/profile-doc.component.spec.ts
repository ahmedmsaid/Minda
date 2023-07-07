import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDocComponent } from './profile-doc.component';

describe('ProfileDocComponent', () => {
  let component: ProfileDocComponent;
  let fixture: ComponentFixture<ProfileDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
