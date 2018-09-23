import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsShowComponent } from './news-show.component';

describe('NewsShowComponent', () => {
  let component: NewsShowComponent;
  let fixture: ComponentFixture<NewsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsShowComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
