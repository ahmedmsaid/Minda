import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlecvideoComponent } from './editlecvideo.component';

describe('EditlecvideoComponent', () => {
  let component: EditlecvideoComponent;
  let fixture: ComponentFixture<EditlecvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlecvideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditlecvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
