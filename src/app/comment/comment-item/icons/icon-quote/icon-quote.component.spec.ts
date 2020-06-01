import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconQuoteComponent } from './icon-quote.component';

describe('IconQuoteComponent', () => {
  let component: IconQuoteComponent;
  let fixture: ComponentFixture<IconQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconQuoteComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
