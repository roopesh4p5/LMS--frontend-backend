import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyleavesComponent } from './myleaves.component';

describe('MyleavesComponent', () => {
  let component: MyleavesComponent;
  let fixture: ComponentFixture<MyleavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyleavesComponent]
    });
    fixture = TestBed.createComponent(MyleavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
