import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedqueComponent } from './relatedque.component';

describe('RelatedqueComponent', () => {
  let component: RelatedqueComponent;
  let fixture: ComponentFixture<RelatedqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
