import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpathComponent } from './xpath.component';

describe('XpathComponent', () => {
  let component: XpathComponent;
  let fixture: ComponentFixture<XpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XpathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
