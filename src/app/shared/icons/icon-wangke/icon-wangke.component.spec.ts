import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWangkeComponent } from './icon-wangke.component';

describe('IconWangkeComponent', () => {
  let component: IconWangkeComponent;
  let fixture: ComponentFixture<IconWangkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconWangkeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWangkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
