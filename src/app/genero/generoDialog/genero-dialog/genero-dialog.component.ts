import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genero } from 'src/app/models/criar-generos.models';
import { SalvarGeneroService } from 'src/app/services/salvar-genero.service';

@Component({
  selector: 'app-genero-dialog',
  templateUrl: './genero-dialog.component.html',
  styleUrls: ['./genero-dialog.component.scss']
})
export class GeneroDialogComponent implements OnInit {

  idGlobal: any
  form: FormGroup;
  generos: Genero[];
  error = "Esta campo é obrigatorio";
  

  constructor(
    public dialogRef: MatDialogRef<GeneroDialogComponent>,
    private formBuilder: FormBuilder,
    private salvarGeneroService : SalvarGeneroService,
    @Inject(MAT_DIALOG_DATA) public data: Genero
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      gd_nome: new FormControl ('', [Validators.required]),
      gd_id: ['']
    })

    this.form.controls['gd_id'].setValue(this.data.id);
    this.form.controls['gd_nome'].setValue(this.data.generoNome);


  }

  editarGenero(){

    let dataDialog: Genero = { 

    id: this.form.controls['gd_id'].value,
    generoNome: this.form.controls ['gd_nome'].value

    };

    console.log(this.data);

    this.data.id = this.form.controls['gd_id'].value,
    this.data.generoNome = this.form.controls['gd_nome'].value,
 
    this.dialogRef.close(this.data);


  }


  cancelarDialog(): void {
    this.dialogRef.close();
  }



}
