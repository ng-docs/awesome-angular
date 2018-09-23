import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgTitleComponent } from './svg-title.component';

describe('SvgTitleComponent', () => {
  let component: SvgTitleComponent;
  let fixture: ComponentFixture<SvgTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgTitleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
