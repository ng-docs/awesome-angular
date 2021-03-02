import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleNavNodeComponent } from './article-nav-node.component';

describe('ArticleNavNodeComponent', () => {
  let component: ArticleNavNodeComponent;
  let fixture: ComponentFixture<ArticleNavNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleNavNodeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleNavNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
