import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowDetail } from './cow-detail';

describe('CowDetail', () => {
  let component: CowDetail;
  let fixture: ComponentFixture<CowDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CowDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
