import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudLocationComponent } from './crud-location.component';

describe('CrudLocationComponent', () => {
  let component: CrudLocationComponent;
  let fixture: ComponentFixture<CrudLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
