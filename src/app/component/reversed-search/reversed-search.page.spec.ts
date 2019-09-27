import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversedSearchPage } from './reversed-search.page';

describe('ReversedSearchPage', () => {
  let component: ReversedSearchPage;
  let fixture: ComponentFixture<ReversedSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversedSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversedSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
