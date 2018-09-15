import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGithubComponent } from './icon-github.component';

describe('IconGithubComponent', () => {
  let component: IconGithubComponent;
  let fixture: ComponentFixture<IconGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconGithubComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
