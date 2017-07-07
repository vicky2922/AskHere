import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyquestionComponent } from './onlyquestion.component';

describe('OnlyquestionComponent', () => {
  let component: OnlyquestionComponent;
  let fixture: ComponentFixture<OnlyquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
