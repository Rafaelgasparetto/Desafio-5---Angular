import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filme } from 'src/app/models/criar-filmes.models';
import { Genero } from 'src/app/models/criar-generos.models';
import { SalvarFilmeService } from 'src/app/services/salvar-filme.service';
import { SalvarGeneroService } from 'src/app/services/salvar-genero.service';

@Component({
  selector: 'app-filme-dialog',
  templateUrl: './filme-dialog.component.html',
  styleUrls: ['./filme-dialog.component.scss']
})
export class FilmeDialogComponent implements OnInit {

  error = "Este campo é obrigatorio";
  form: FormGroup;
  filmes: Filme[];
  generos: Genero[];

  constructor(
    public dialogRef: MatDialogRef<FilmeDialogComponent>,
    private formBuilder: FormBuilder,
    private salvarFilmeService : SalvarFilmeService,
    private salvarGeneroService: SalvarGeneroService,
    @Inject(MAT_DIALOG_DATA) public data: Filme,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fd_nome: new FormControl('', [Validators.required]),
      fd_genero: new FormControl('', [Validators.required]),
      fd_id: ['']
    })

    this.form.controls['fd_nome'].setValue(this.data.filmeNome);
    this.form.controls['fd_genero'].setValue(this.data.generoFilme);
    this.form.controls['fd_id'].setValue(this.data.id);


    this.salvarGeneroService.lerGeneros().subscribe({
      next: (generos: Genero[]) => {
        this.generos = generos;
  
        console.log(this.generos);
        
      },
      error: () => {
        console.log("erro ao ler Generos no select");
      }
     })



  }


  editarFilme(){

    let dataDialog: Filme = {

      id: this.form.controls['fd_id'].value,
      filmeNome: this.form.controls['fd_nome'].value,
      generoFilme: this.form.controls['fd_genero'].value

    }

    console.log(this.data);

    this.data.id = this.form.controls['fd_id'].value,
    this.data.filmeNome = this.form.controls['fd_nome'].value,
    this.data.generoFilme = this.form.controls['fd_genero'].value,
    
    this.dialogRef.close(this.data);

  }


  cancelarEditarFilme(): void {
    this.dialogRef.close();
  }

}
