import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmCartazPage } from './em-cartaz.page';

describe('EmCartazPage', () => {
  let component: EmCartazPage;
  let fixture: ComponentFixture<EmCartazPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmCartazPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
