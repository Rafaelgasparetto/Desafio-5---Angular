import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  filmes: Filme[]; // usando a interface de filmes
  generos: Genero[]; // usando a interface de genero
  loading = this.salvarFilmeService.loading; //atribuindo o spinner a variavel loading

  constructor(
    private formBuilder: FormBuilder,
    private salvarFilmeService: SalvarFilmeService,
    public dialog: MatDialog,
    private salvarGeneroService: SalvarGeneroService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.formCadastrarFilmes = this.formBuilder.group({
    titulo: new FormControl('', [Validators.required]), // validações e formando um grupo
    genero: new FormControl('', [Validators.required])
    })

    this.salvarFilmeService.lerFilmes().subscribe({
      next: (filmes: Filme[]) => {

        this.filmes = filmes; // ler filmes quando a tela for inicializada

        console.log(this.filmes);
        
      },
      error: () =>{
        this.alertaDados("erro_bancoDados"); // chamando a função alerta dados para a snackbar e passando o erro de BD caso não tiver leitura 
      }
    })

    this.salvarGeneroService.lerGeneros().subscribe({ // chamando a função de leitura de genero para aparecer no select de filmes
      next: (generos: Genero[]) => {
        this.generos = generos; 
        console.log(this.generos); 
      },
      error: () => {
        this.alertaDados("erro_select"); // chamando a função alerta dados para a snackbar e passando o erro no select
      }
    })

  }

  //---------------------------- Função de salvar filmes ---------------------------

  SalvarDadosFilmes(){
    
    this.salvarFilmeService.showLoading(); // chamando o Spinner

    const id = this.filmes[this.filmes.length - 1].id +1; //adicionando +1 id no ultimo id do filmes
    const filme = this.formCadastrarFilmes.controls['titulo'].value;  // atribuir os valores do input nas variaveis
    const genero = this.formCadastrarFilmes.controls['genero'].value;

    const tipoFilme: Filme = {id: id, filmeNome: filme, generoFilme: genero} // fazendo um objeto com as informaçoes do input
    
    console.log(tipoFilme);
    
    this.salvarFilmeService.salvarFilmes(tipoFilme).subscribe({ //salvando filme
      next: () => {
        this.ngOnInit(); //chamar ngonit para atualização da pagina quando cadastrar
        this.salvarFilmeService.hideLoading(); //desativando o spinner
        this.alertaDados("sucesso_cadastrar"); //SnackBar de sucesso
      },
      error: () => {
        this.salvarFilmeService.hideLoading(); //desativando o spinner
        this.alertaDados("falha_cadastrar");  //SnackBar de Falha
      }
    })
  }


  //-------------------------------- Função de Excluir Filme ------------------------------

  excluirFilme(id: any){
    this.salvarFilmeService.showLoading(); // chamando o Spinner
    this.salvarFilmeService.excluirFilmes(id).subscribe({
      next: () => {
        this.ngOnInit(); //chamar ngonit para atualização da pagina quando Excluir
        this.salvarFilmeService.hideLoading(); //desativando o spinner
        this.alertaDados("sucesso_excluir")
      },
      error: () => {
        this.salvarFilmeService.hideLoading(); //desativando o spinner
        this.alertaDados("falha_excluir");
      }
    })

  }

  // ------------------------------ Função para abrir o Dialog -----------------------------

  openDialog(id: number, enterAnimationDuration: string,
    exitAnimationDuration: string): void {
      this.salvarFilmeService.showLoading(); // chamando o Spinner
      this.salvarFilmeService.pegarId(id).subscribe({
        next: (filme: Filme) =>{
          this.salvarFilmeService.hideLoading(); //desativando o spinner
          const dialogRef = this.dialog.open(FilmeDialogComponent, {
            width: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {id: filme.id, filmeNome: filme.filmeNome, generoFilme: filme.generoFilme}
          });
        
          dialogRef.afterClosed().subscribe(result => { // depois que fecha o Dialog vai editar o filme
            if(result){
              this.salvarFilmeService.editarFilmes(result).subscribe({
                next:() => {
                  this.ngOnInit(); //chamar ngonit para atualização da pagina quando editar
                  this.salvarFilmeService.hideLoading(); //desativando o spinner
                  this.alertaDados("sucesso_editar"); // chamando a função alerta dados para a snackbar e passando o erro
                },
                error:() => {
                  this.salvarFilmeService.hideLoading(); //desativando o spinner
                  this.alertaDados("falha_editar"); // chamando a função alerta dados para a snackbar e passando o erro
                },
              });
            }

          });
        },
        error:() =>{
        this.salvarFilmeService.hideLoading(); //desativando o spinner
        this.alertaDados("erro_generico"); // chamando a função alerta dados para a snackbar e passando o erro
        },
      });
  }

  //----------------------------------------- função para tratamento de erro SnackBar -------------------------------

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
