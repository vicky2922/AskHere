import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchstuffComponent } from './searchstuff.component';

describe('SearchstuffComponent', () => {
  let component: SearchstuffComponent;
  let fixture: ComponentFixture<SearchstuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchstuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchstuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
