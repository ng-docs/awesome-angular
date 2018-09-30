import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNodeComponent } from './nav-node.component';

describe('NavNodeComponent', () => {
  let component: NavNodeComponent;
  let fixture: ComponentFixture<NavNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavNodeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
