import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  formCadastrarUsuario: FormGroup; // para agrupar elementos
  error = "Este campo é obrigatorio"

  constructor(
    private formBuilder: FormBuilder) 
  {  }

  ngOnInit(): void {
    this.formCadastrarUsuario = this.formBuilder.group({ // defenindo elementos
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('',  [Validators.required, Validators.email]),
      tel: new FormControl('',  [Validators.required]), 
    })
  }

  SalvarDadosUsuario(){
    console.log("clicou");
    
  }

  validaEmail(): String{
    // console.log(this.formCadastrarUsuario.controls["email"].errors); // teste para saber se esta validando por caracterer
    
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

  // botaoDesabilitado(){

  //   if(this.botaoDesabilitado == [disabled]="!formCadastrarUsuario.valid")

  // }
  

}
