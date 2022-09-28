import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDialogComponent } from './filme-dialog.component';

describe('FilmeDialogComponent', () => {
  let component: FilmeDialogComponent;
  let fixture: ComponentFixture<FilmeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
