import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendNavbarComponent } from './frontend-navbar.component';

describe('FrontendNavbarComponent', () => {
  let component: FrontendNavbarComponent;
  let fixture: ComponentFixture<FrontendNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontendNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
