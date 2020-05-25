import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussHomeComponent } from './discuss-home.component';

describe('HomeComponent', () => {
  let component: DiscussHomeComponent;
  let fixture: ComponentFixture<DiscussHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussHomeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
