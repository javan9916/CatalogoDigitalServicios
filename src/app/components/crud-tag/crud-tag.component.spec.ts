import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTagComponent } from './crud-tag.component';

describe('CrudTagComponent', () => {
  let component: CrudTagComponent;
  let fixture: ComponentFixture<CrudTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
