import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginchoiceComponent } from './loginchoice.component';

describe('LoginchoiceComponent', () => {
  let component: LoginchoiceComponent;
  let fixture: ComponentFixture<LoginchoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginchoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginchoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
