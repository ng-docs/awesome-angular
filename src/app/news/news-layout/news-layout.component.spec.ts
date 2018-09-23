import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLayoutComponent } from './news-layout.component';

describe('NewsLayoutComponent', () => {
  let component: NewsLayoutComponent;
  let fixture: ComponentFixture<NewsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsLayoutComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
