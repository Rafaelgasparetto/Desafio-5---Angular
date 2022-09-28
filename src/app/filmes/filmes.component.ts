import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Filme } from '../models/criar-filmes.models';
import { Genero } from '../models/criar-generos.models';
import { SalvarFilmeService } from '../services/salvar-filme.service';
import { SalvarGeneroService } from '../services/salvar-genero.service';
import { FilmeDialogComponent } from './FilmeDialog/filme-dialog/filme-dialog.component';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  
  formCadastrarFilmes: FormGroup; // o FormGoup é para Agrupar os elementos
  error = "Este campo é obrigatorio"
  filmes: Filme[];
  generos: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private salvarFilmeService: SalvarFilmeService,
    public dialog: MatDialog,
    private salvarGeneroService: SalvarGeneroService,
    ) { }

  ngOnInit(): void {
    this.formCadastrarFilmes = this.formBuilder.group({
    titulo: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required])
    })

    this.salvarFilmeService.lerFilmes().subscribe({
      next: (filmes: Filme[]) => {

        this.filmes = filmes;

        console.log(this.filmes);
        
      },
      error: () =>{
        console.log("Erro para ler o filme");
      }
    })

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

  SalvarDadosFilmes(){
    
    const id = this.filmes[this.filmes.length - 1].id +1;
    const filme = this.formCadastrarFilmes.controls['titulo'].value;
    const genero = this.formCadastrarFilmes.controls['genero'].value;

    const tipoFilme: Filme = {id: id, filmeNome: filme, generoNome: genero}
    
    console.log(tipoFilme);
    
    this.salvarFilmeService.salvarFilmes(tipoFilme).subscribe({
      next: () => {
        console.log("Filme Salvo");
        this.ngOnInit();
      },
      error: () => {
        console.log("erro ao salvar filme");
      }
    })
  }

  excluirFilme(id: any){
    this.salvarFilmeService.excluirFilmes(id).subscribe({
      next: () => {
        console.log("Filme deletado");
        this.ngOnInit();
      },
      error: () => {
        console.log("erro ao deletar Filme");
      }
    })

  }


  openDialog(id: number, enterAnimationDuration: string,
    exitAnimationDuration: string): void {
      this.salvarFilmeService.pegarId(id).subscribe({
        next: (filme: Filme) =>{
          const dialogRef = this.dialog.open(FilmeDialogComponent, {
            width: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {id: filme.id, filmeNome: filme.filmeNome, generoNome: filme.generoNome}
          });
        
  
          dialogRef.afterClosed().subscribe(result => {
            this.salvarFilmeService.editarFilmes(result).subscribe({
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






}
