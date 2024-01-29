import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShelfPage } from './shelf.page';

describe('ShelfPage', () => {
  let component: ShelfPage;
  let fixture: ComponentFixture<ShelfPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShelfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
