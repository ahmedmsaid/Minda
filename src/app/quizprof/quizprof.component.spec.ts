import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizprofComponent } from './quizprof.component';

describe('QuizprofComponent', () => {
  let component: QuizprofComponent;
  let fixture: ComponentFixture<QuizprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
