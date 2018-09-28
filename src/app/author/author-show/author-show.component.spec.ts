import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorShowComponent } from './author-show.component';

describe('AuthorShowComponent', () => {
  let component: AuthorShowComponent;
  let fixture: ComponentFixture<AuthorShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorShowComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
