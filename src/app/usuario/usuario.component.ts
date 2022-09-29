import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { usuario } from '../models/criar-usuarios.models';
import { SalvarClienteService } from '../services/salvar-cliente.service';
import { UsuarioDialogComponent } from './usuarioDialog/usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {


  idGlobal: number = 0;
  formCadastrarUsuario: FormGroup; // para agrupar elementos
  error = "Este campo é obrigatorio"
  clientes: usuario[];
  loading = this.salvarClientesService.loading;
  
  

  constructor(
    private formBuilder: FormBuilder,
    private salvarClientesService : SalvarClienteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) 
  {  }

  ngOnInit(): void {
    this.formCadastrarUsuario = this.formBuilder.group({ // defenindo elementos
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('',  [Validators.required, Validators.email]), //Validando os Inputs
      tel: new FormControl('',  [Validators.required]), 
    })
    
    this.salvarClientesService.lerClientes().subscribe({
      next: (clientes: usuario[]) => {
        this.clientes = clientes;
      },
      error: () => {
        this.alertaDados("erro_bancoDados");
      }
    })

  }



  openDialog(id: number, enterAnimationDuration: string,
    exitAnimationDuration: string): void {
      this.salvarClientesService.showLoading();
      this.salvarClientesService.pegarId(id).subscribe({
        next: (usuario: usuario) =>{
          this.salvarClientesService.hideLoading();
          const dialogRef = this.dialog.open(UsuarioDialogComponent, {
            width: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {id: usuario.id, nome: usuario.nome, email: usuario.email, tel: usuario.tel}
          });
        

        dialogRef.afterClosed().subscribe(usuario2 => {
          this.salvarClientesService.editarCliente(usuario2).subscribe({
            next:() => {
              this.ngOnInit();
              this.salvarClientesService.hideLoading();
              this.alertaDados("sucesso_editar");
            },
            error:() => {
              this.salvarClientesService.hideLoading();
              this.alertaDados("falha_editar");
        },
          });
          
        });
        
      },
      error:() =>{
        this.salvarClientesService.hideLoading();
        this.alertaDados("erro_generico");
         
      },
      
    });}


    

  validaEmail(): String{
    
    if(this.formCadastrarUsuario.controls["email"].hasError('required')){
      return this.error;
    }
    return this.formCadastrarUsuario.controls["email"].hasError('email') ? "E-mail inválido" : '';
  }

  confirmarTelefone(): String{ 
    return this.error // falta implementar com minimo lenght e max lenght (vai ficar para um update do projeto)
  }


  SalvarDadosUsuario(){

    this.salvarClientesService.showLoading();

    const id = (this.clientes[(this.clientes.length) - 1].id) +1; //pegando o id e colocando +1 para adicionar o id na ultima posição
    const nome = this.formCadastrarUsuario.controls["nome"].value;
    const email = this.formCadastrarUsuario.controls["email"].value; // pegando os valores do inputs componente usuario
    const tel = this.formCadastrarUsuario.controls["tel"].value;

    const cliente: usuario = { id: id, nome: nome, email: email, tel: tel};  // criando um objeto para cada novo cliente

    this.salvarClientesService.salvarCliente(cliente).subscribe({
      next: () => {
        console.log(this.clientes);  
        this.ngOnInit();
        this.salvarClientesService.hideLoading();
        this.alertaDados("sucesso_cadastrar");
      },
      error: () =>{
        this.salvarClientesService.hideLoading();
        this.alertaDados("falha_cadastrar");
      }
    });

  }

  excluirCliente(id: any){
    this.salvarClientesService.showLoading();
    this.salvarClientesService.excluirCliente(id).subscribe({
      next: () =>{
        console.log(id);
        this.ngOnInit();
        this.salvarClientesService.hideLoading();
        this.alertaDados("sucesso_excluir")
      },
      error: () => {
        this.salvarClientesService.hideLoading();
        this.alertaDados("falha_excluir");
      }
    })
  }

  //Função para snackbar e feedback para o usuario
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
              // duration: 20000,
              panelClass: ['snackbar-tema']
            })
          break;

          case "erro_generico":
            this.snackBar.open("Erro :(", undefined, {
              // duration: 20000,
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
