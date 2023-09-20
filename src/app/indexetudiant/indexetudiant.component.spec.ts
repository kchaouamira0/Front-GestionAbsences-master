import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexetudiantComponent } from './indexetudiant.component';

describe('IndexetudiantComponent', () => {
  let component: IndexetudiantComponent;
  let fixture: ComponentFixture<IndexetudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexetudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
