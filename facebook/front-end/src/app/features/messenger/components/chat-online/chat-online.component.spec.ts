import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOnlineComponent } from './chat-online.component';

describe('ChatOnlineComponent', () => {
  let component: ChatOnlineComponent;
  let fixture: ComponentFixture<ChatOnlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatOnlineComponent]
    });
    fixture = TestBed.createComponent(ChatOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
