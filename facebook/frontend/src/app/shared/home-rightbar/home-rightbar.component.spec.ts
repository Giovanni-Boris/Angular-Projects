import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRightbarComponent } from './home-rightbar.component';

describe('HomeRightbarComponent', () => {
  let component: HomeRightbarComponent;
  let fixture: ComponentFixture<HomeRightbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeRightbarComponent]
    });
    fixture = TestBed.createComponent(HomeRightbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
