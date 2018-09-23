import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLayoutComponent } from './article-layout.component';

describe('ArticleLayoutComponent', () => {
  let component: ArticleLayoutComponent;
  let fixture: ComponentFixture<ArticleLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleLayoutComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
