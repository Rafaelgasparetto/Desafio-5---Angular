import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filme } from 'src/app/models/criar-filmes.models';
import { SalvarFilmeService } from 'src/app/services/salvar-filme.service';

@Component({
  selector: 'app-filme-dialog',
  templateUrl: './filme-dialog.component.html',
  styleUrls: ['./filme-dialog.component.scss']
})
export class FilmeDialogComponent implements OnInit {

  error = "Este campo é obrigatorio";
  form: FormGroup;
  filmes: Filme[];

  constructor(
    public dialogRef: MatDialogRef<FilmeDialogComponent>,
    private formBuilder: FormBuilder,
    private salvarFilmeService : SalvarFilmeService,
    @Inject(MAT_DIALOG_DATA) public data: Filme,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fd_nome: new FormControl('', [Validators.required]),
      fd_genero: new FormControl('', [Validators.required]),
      fd_id: ['']
    })

    this.form.controls['fd_nome'].setValue(this.data.filmeNome);
    this.form.controls['fd_genero'].setValue(this.data.generoNome);
    this.form.controls['fd_id'].setValue(this.data.id);

  }


  editarFilme(){

    let dataDialog: Filme = {

      id: this.form.controls['fd_id'].value,
      filmeNome: this.form.controls['fd_nome'].value,
      generoNome: this.form.controls['fd_genero'].value

    }

    console.log(this.data);

    this.data.id = this.form.controls['fd_id'].value,
    this.data.filmeNome = this.form.controls['fd_nome'].value,
    this.data.generoNome = this.form.controls['fd_genero'].value,
    
    this.dialogRef.close(this.data);

  }




  cancelarEditarFilme(): void {
    this.dialogRef.close();
  }

}
