import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFriendComponent } from './close-friend.component';

describe('CloseFriendComponent', () => {
  let component: CloseFriendComponent;
  let fixture: ComponentFixture<CloseFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseFriendComponent]
    });
    fixture = TestBed.createComponent(CloseFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
