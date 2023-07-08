import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDocComponent } from './quiz-doc.component';

describe('QuizDocComponent', () => {
  let component: QuizDocComponent;
  let fixture: ComponentFixture<QuizDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
