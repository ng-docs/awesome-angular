import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAngularComponent } from './icon-angular.component';

describe('IconAngularComponent', () => {
  let component: IconAngularComponent;
  let fixture: ComponentFixture<IconAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconAngularComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
