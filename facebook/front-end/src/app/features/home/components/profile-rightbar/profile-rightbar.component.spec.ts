import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRightbarComponent } from './profile-rightbar.component';

describe('ProfileRightbarComponent', () => {
  let component: ProfileRightbarComponent;
  let fixture: ComponentFixture<ProfileRightbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileRightbarComponent]
    });
    fixture = TestBed.createComponent(ProfileRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
