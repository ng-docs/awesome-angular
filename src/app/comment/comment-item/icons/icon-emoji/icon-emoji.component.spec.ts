import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEmojiComponent } from './icon-emoji.component';

describe('IconEmotionComponent', () => {
  let component: IconEmojiComponent;
  let fixture: ComponentFixture<IconEmojiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconEmojiComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
