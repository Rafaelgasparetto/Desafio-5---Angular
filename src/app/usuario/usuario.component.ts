import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  
  

  constructor(
    private formBuilder: FormBuilder,
    private salvarClientesService : SalvarClienteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
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

        // console.log(this.clientes);
        
      },
      error: () => {
        console.log("erro ao ler os clientes");
      }
    })


  }

  openDialog(id: any, nome: String, email: String, tel: String): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '250px',
      data: {id, nome, email, tel}
    });

    this.idGlobal = id;

    this.formCadastrarUsuario.controls["nome"].setValue(nome)
    this.formCadastrarUsuario.controls["email"].setValue(email)
    this.formCadastrarUsuario.controls["tel"].setValue(tel)

     
    console.log(this.idGlobal);
    console.log(nome);
    console.log(email);
    console.log(tel);
    

    dialogRef.afterClosed().subscribe(result => {
      console.log('O dialogo foi Fechado');
      // this.animal = result;
    });
  }

  validaEmail(): String{
    
    if(this.formCadastrarUsuario.controls["email"].hasError('required')){
      return this.error;
    }
    return this.formCadastrarUsuario.controls["email"].hasError('email') ? "E-mail inválido" : '';
  }

  confirmarTelefone(): String{ // falta implementar com minimo lenght e max lenght

    return this.error
    // if(this.formCadastrarUsuario.controls["tel"].hasError('required')){
    //   return this.error;
    // }

    // if(this.formCadastrarUsuario.controls["tel"].value.length < 10){
    //   return "10 numeros no minimo"
    // }

    // return this.formCadastrarUsuario.controls["tel"].hasError('NaN') ? "Digite um texto com numeros" : ''; //Inplementar direito

  }


  SalvarDadosUsuario(){

    const id = (this.clientes[(this.clientes.length) - 1].id) +1; //pegando o id e colocando +1 para adicionar o id na ultima posição
    const nome = this.formCadastrarUsuario.controls["nome"].value;
    const email = this.formCadastrarUsuario.controls["email"].value; // pegando os valores do inputs componente usuario
    const tel = this.formCadastrarUsuario.controls["tel"].value;

    const cliente: usuario = { id: id, nome: nome, email: email, tel: tel};  // criando um objeto para cada novo cliente


    this.salvarClientesService.salvarCliente(cliente).subscribe({
      next: () => {
        console.log("salvou");
        console.log(this.clientes);
        
        this.ngOnInit();
      },
      error: () =>{
        console.log("erro ao salvar cliente");
      }
    });

  }

  excluirCliente(id: any){
    this.salvarClientesService.excluirCliente(id).subscribe({
      next: () =>{
        console.log("Cliente excluido");
        console.log(id);
        this.ngOnInit();
      },
      error: () => {
        console.log("erro ao excluir cliente");
      }
    })
  }



  // puxarInput(id: any, nome: String, email: String, tel: String){

  //   this.idGlobal = id

  //   this.formCadastrarUsuario.controls["nome"].setValue(nome)
  //   this.formCadastrarUsuario.controls["email"].setValue(email)
  //   this.formCadastrarUsuario.controls["tel"].setValue(tel)

  // }







}
