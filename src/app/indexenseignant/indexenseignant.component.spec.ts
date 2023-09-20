import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexenseignantComponent } from './indexenseignant.component';

describe('IndexenseignantComponent', () => {
  let component: IndexenseignantComponent;
  let fixture: ComponentFixture<IndexenseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexenseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexenseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
