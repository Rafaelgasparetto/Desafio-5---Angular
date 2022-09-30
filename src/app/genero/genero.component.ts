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
  formCadastrarGenero: FormGroup; // para agrupar elementos
  error = "Este campo é obrigatorio" //mensagem de erro automatica para os inputs da pagina
  generos: Genero[]; // usando a interface de genero
  loading = this.salvarGeneroService.loading; //atribuindo o spinner a variavel loading

  constructor(
    private formBuilder: FormBuilder,
    private salvarGeneroService: SalvarGeneroService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    )
  { }


  ngOnInit(): void {
    this.formCadastrarGenero = this.formBuilder.group({ // defenindo elementos / validações e formando um grupo
      genero: new FormControl('', [Validators.required]) 
    })

   this.salvarGeneroService.lerGeneros().subscribe({
    next: (generos: Genero[]) => {
      this.generos = generos; // ler generos quando a tela for inicializada
      console.log(this.generos); // demostração no log
    },
    error: () => {
      this.alertaDados("erro_bancoDados"); // chamando a função alerta dados para a snackbar e passando o erro de BD caso não tiver leitura
    }
   })

  }

  nextId(){
    
    console.log(this.generos.length);
    let maiorId = 0;
    // let maiorId: number = this.clientes[(this.clientes.length) - 1].id
    for (let i = 0; i < this.generos.length; i++) {
      this.generos[i].id
      if(this.generos.length > 0){
        maiorId = this.generos[i].id
      }
      
    }
    maiorId++;
    console.log(maiorId);

    return maiorId;
  }




  // ------------------------------ Função para abrir o Dialog -----------------------------

  openDialog(id: number, enterAnimationDuration: string,
  exitAnimationDuration: string): void {
    this.salvarGeneroService.showLoading(); //ativar Spinner
    this.salvarGeneroService.pegarId(id).subscribe({ // pegar o id para o Dialog
      next: (genero: Genero) =>{
        this.salvarGeneroService.hideLoading(); // desativar Spinner
        const dialogRef = this.dialog.open(GeneroDialogComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {id: genero.id, generoNome: genero.generoNome} // data para levar para o Dialog
        });
      
        dialogRef.afterClosed().subscribe(result => { // depois que fecha o Dialog vai editar o Genero
          if(result){
            this.salvarGeneroService.editarGenero(result).subscribe({ // edita o genero
              next:() => {
                this.ngOnInit(); //chamar ngonit para atualização da pagina quando editar
                this.salvarGeneroService.hideLoading(); //desativando o spinner
                this.alertaDados("sucesso_editar");
              },
              error:() => {
                this.salvarGeneroService.hideLoading(); //desativando o spinner
                this.alertaDados("falha_editar");
              },
            });
          }
        });
      },
      error:() =>{
      this.salvarGeneroService.hideLoading(); //desativando o spinner
      this.alertaDados("erro_generico");
      },
    });
  }
  

  //---------------------------- Função de salvar Genero ---------------------------

  salvarDadosGeneros(){

    this.salvarGeneroService.showLoading(); // chamando o Spinner

    const id = this.nextId();
    // const id = this.generos[this.generos.length - 1].id +1; //adicionando +1 id no ultimo id do genero
    const genero = this.formCadastrarGenero.controls['genero'].value; // atribuir os valores do input nas variaveis
    const tipoGenero: Genero = {id: id, generoNome: genero} // fazendo um objeto com as informaçoes do input

    console.log(tipoGenero); // demostração no Log

    this.salvarGeneroService.salvarGeneros(tipoGenero).subscribe({ //salvando filme
      next: () => {
        this.ngOnInit(); //chamar ngonit para atualização da pagina quando cadastrar
        this.salvarGeneroService.hideLoading(); //desativando o spinner
        this.alertaDados("sucesso_cadastrar"); //SnackBar de sucesso
      },
      error: () => {
        this.salvarGeneroService.hideLoading(); //desativando o spinner
        this.alertaDados("falha_cadastrar"); //SnackBar de Falha
      }
    })
  }

  //-------------------------------- Função de Excluir Genero ------------------------------

  excluirGeneros(id: any){
    this.salvarGeneroService.showLoading();
    this.salvarGeneroService.excluirGeneros(id).subscribe({
      next: () => {
        this.ngOnInit(); //chamar ngonit para atualização da pagina quando Excluir
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
