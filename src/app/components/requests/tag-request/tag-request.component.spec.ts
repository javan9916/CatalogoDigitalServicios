import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRequestComponent } from './tag-request.component';

describe('TagRequestComponent', () => {
  let component: TagRequestComponent;
  let fixture: ComponentFixture<TagRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
