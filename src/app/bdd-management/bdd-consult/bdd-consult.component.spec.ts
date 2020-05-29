import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BddConsultComponent } from './bdd-consult.component';

describe('BddConsultComponent', () => {
  let component: BddConsultComponent;
  let fixture: ComponentFixture<BddConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BddConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BddConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
