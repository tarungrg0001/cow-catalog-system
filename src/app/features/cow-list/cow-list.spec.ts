import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CowList } from './cow-list';

describe('CowList', () => {
  let component: CowList;
  let fixture: ComponentFixture<CowList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CowList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CowList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
