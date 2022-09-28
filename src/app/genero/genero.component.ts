import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Genero } from '../models/criar-generos.models';
import { SalvarGeneroService } from '../services/salvar-genero.service';
import { GeneroDialogComponent } from './generoDialog/genero-dialog/genero-dialog.component';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {


  idGlobal: number = 0;
  formCadastrarGenero: FormGroup;
  error = "Este campo é obrigatorio"
  generos: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private salvarGeneroService: SalvarGeneroService,
    public dialog: MatDialog
    )
  { }


  ngOnInit(): void {
    this.formCadastrarGenero = this.formBuilder.group({
      genero: new FormControl('', [Validators.required])
    })

   this.salvarGeneroService.lerGeneros().subscribe({
    next: (generos: Genero[]) => {
      this.generos = generos;

      console.log(this.generos);
      
    },
    error: () => {
      console.log("erro ao ler Generos");
    }
   })

  }

  openDialog(id: number, enterAnimationDuration: string,
  exitAnimationDuration: string): void {
    this.salvarGeneroService.pegarId(id).subscribe({
      next: (genero: Genero) =>{
        const dialogRef = this.dialog.open(GeneroDialogComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {id: genero.id, generoNome: genero.generoNome}
        });
      

        dialogRef.afterClosed().subscribe(result => {
          this.salvarGeneroService.editarGenero(result).subscribe({
            next:() => {
              this.ngOnInit();
              
            },
            error:() => {
              console.log("erro");
            },
          });
        });
      },
      error:() =>{
      console.log("erro");
      },
    });
  }
  


  salvarDadosGeneros(){

    const id = this.generos[this.generos.length - 1].id +1;

    const genero = this.formCadastrarGenero.controls['genero'].value;

    const tipoGenero: Genero = {id: id, generoNome: genero}

    console.log(tipoGenero);

    this.salvarGeneroService.salvarGeneros(tipoGenero).subscribe({
      next: () => {
        console.log("sucesso");
        this.ngOnInit();
      },
      error: () => {
        console.log("erro");
      }
    })
  }


  excluirGeneros(id: any){
    this.salvarGeneroService.excluirGeneros(id).subscribe({
      next: () => {
        console.log("Deletado");
        this.ngOnInit();
      },
      error: () =>{
        console.log("erro no delete");
        
      }
    })
  }


}
