import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbtResultPage } from './cbt-result.page';

describe('CbtResultPage', () => {
  let component: CbtResultPage;
  let fixture: ComponentFixture<CbtResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbtResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
