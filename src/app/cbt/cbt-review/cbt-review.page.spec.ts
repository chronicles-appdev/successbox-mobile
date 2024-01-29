import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CbtReviewPage } from './cbt-review.page';

describe('CbtReviewPage', () => {
  let component: CbtReviewPage;
  let fixture: ComponentFixture<CbtReviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CbtReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
