import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseModalPage } from './reverse-modal.page';

describe('ReverseModalPage', () => {
  let component: ReverseModalPage;
  let fixture: ComponentFixture<ReverseModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
