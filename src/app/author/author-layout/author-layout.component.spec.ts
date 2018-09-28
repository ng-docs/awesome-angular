import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorLayoutComponent } from './author-layout.component';

describe('AuthorLayoutComponent', () => {
  let component: AuthorLayoutComponent;
  let fixture: ComponentFixture<AuthorLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorLayoutComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
