import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceRequestComponent } from './delete-service-request.component';

describe('DeleteServiceRequestComponent', () => {
  let component: DeleteServiceRequestComponent;
  let fixture: ComponentFixture<DeleteServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
