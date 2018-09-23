import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryShowComponent } from './library-show.component';

describe('LibraryShowComponent', () => {
  let component: LibraryShowComponent;
  let fixture: ComponentFixture<LibraryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryShowComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
