import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePillsComponent } from './language-pills.component';

describe('LanguagePillsComponent', () => {
  let component: LanguagePillsComponent;
  let fixture: ComponentFixture<LanguagePillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagePillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagePillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
