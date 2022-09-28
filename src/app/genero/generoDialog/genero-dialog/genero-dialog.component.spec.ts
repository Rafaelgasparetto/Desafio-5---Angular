import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroDialogComponent } from './genero-dialog.component';

describe('GeneroDialogComponent', () => {
  let component: GeneroDialogComponent;
  let fixture: ComponentFixture<GeneroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneroDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
