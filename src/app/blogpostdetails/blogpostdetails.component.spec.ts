import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostdetailsComponent } from './blogpostdetails.component';

describe('BlogpostdetailsComponent', () => {
  let component: BlogpostdetailsComponent;
  let fixture: ComponentFixture<BlogpostdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpostdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
