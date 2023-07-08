import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlecComponent } from './editlec.component';

describe('EditlecComponent', () => {
  let component: EditlecComponent;
  let fixture: ComponentFixture<EditlecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditlecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
