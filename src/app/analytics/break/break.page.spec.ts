import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakPage } from './break.page';

describe('BreakPage', () => {
  let component: BreakPage;
  let fixture: ComponentFixture<BreakPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BreakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
