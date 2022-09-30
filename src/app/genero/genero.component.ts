import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  loading = this.salvarGeneroService.loading;

  constructor(
    private formBuilder: FormBuilder,
    private salvarGeneroService: SalvarGeneroService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
      this.alertaDados("erro_bancoDados");
    }
   })

  }

  openDialog(id: number, enterAnimationDuration: string,
  exitAnimationDuration: string): void {
    this.salvarGeneroService.showLoading();
    this.salvarGeneroService.pegarId(id).subscribe({
      next: (genero: Genero) =>{
        this.salvarGeneroService.hideLoading();
        const dialogRef = this.dialog.open(GeneroDialogComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {id: genero.id, generoNome: genero.generoNome}
        });
      

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.salvarGeneroService.editarGenero(result).subscribe({
              next:() => {
                this.ngOnInit();
                this.salvarGeneroService.hideLoading();
                this.alertaDados("sucesso_editar");
                
              },
              error:() => {
                this.salvarGeneroService.hideLoading();
                this.alertaDados("falha_editar");
              },
            });
          }
        });
      },
      error:() =>{
      this.salvarGeneroService.hideLoading();
      this.alertaDados("erro_generico");
      },
    });
  }
  


  salvarDadosGeneros(){

    this.salvarGeneroService.showLoading();

    const id = this.generos[this.generos.length - 1].id +1;

    const genero = this.formCadastrarGenero.controls['genero'].value;

    const tipoGenero: Genero = {id: id, generoNome: genero}

    console.log(tipoGenero);

    this.salvarGeneroService.salvarGeneros(tipoGenero).subscribe({
      next: () => {
        // console.log("sucesso");
        this.ngOnInit();
        this.salvarGeneroService.hideLoading();
        this.alertaDados("sucesso_cadastrar");
      },
      error: () => {
        // console.log("erro");
        this.salvarGeneroService.hideLoading();
        this.alertaDados("falha_cadastrar");
      }
    })
  }


  excluirGeneros(id: any){
    this.salvarGeneroService.showLoading();
    this.salvarGeneroService.excluirGeneros(id).subscribe({
      next: () => {
        // console.log("Deletado");
        this.ngOnInit();
        this.salvarGeneroService.hideLoading();
        this.alertaDados("sucesso_excluir")
      },
      error: () =>{
        this.salvarGeneroService.hideLoading();
        // console.log("erro no delete");
        this.alertaDados("falha_excluir");
        
      }
    })
  }


  alertaDados(tipoExecucao: String){

    switch (tipoExecucao) {
      case "sucesso_cadastrar":
        this.snackBar.open("Cadastrado com sucesso", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema']
        })
      break;

        case "sucesso_editar":
          this.snackBar.open("Editado com sucesso", undefined, {
            duration: 2000,
            panelClass: ['snackbar-tema']
          })
        break;

          case "sucesso_excluir":
            this.snackBar.open("Excluido com sucesso", undefined, {
              duration: 2000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "falha_cadastrar":
            this.snackBar.open("Desculpe, erro ao cadastrar", undefined, {
              duration: 2000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "falha_editar":
            this.snackBar.open("Desculpe, erro ao editar", undefined, {
              duration: 2000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "falha_excluir":
            this.snackBar.open("Desculpe, erro ao excluir", undefined, {
              duration: 2000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "erro_bancoDados":
            this.snackBar.open("Serviço indisponivel no momento, erro 500 (leitura no banco)", undefined, {
              panelClass: ['snackbar-tema']
            })
          break;

          case "erro_generico":
            this.snackBar.open("Erro :(", undefined, {
              duration: 20000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "erro_select":
            this.snackBar.open("erro ao ler Generos no select", undefined, {
              duration: 20000,
              panelClass: ['snackbar-tema']
            })
          break;
    
      default:
        this.snackBar.open("Serviço indisponivel no momento, tente novamente mais tarde", undefined, {
          duration: 2000,
          panelClass: ['snackbar-tema']
        })
        break;
    }
  }


}
