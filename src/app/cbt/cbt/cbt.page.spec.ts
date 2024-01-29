import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbtPage } from './cbt.page';

describe('CbtPage', () => {
  let component: CbtPage;
  let fixture: ComponentFixture<CbtPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
