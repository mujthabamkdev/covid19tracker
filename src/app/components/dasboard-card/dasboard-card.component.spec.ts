import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardCardComponent } from './dasboard-card.component';

describe('DasboardCardComponent', () => {
  let component: DasboardCardComponent;
  let fixture: ComponentFixture<DasboardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
