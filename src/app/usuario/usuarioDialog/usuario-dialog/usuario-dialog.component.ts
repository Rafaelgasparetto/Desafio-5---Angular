import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { usuario } from 'src/app/models/criar-usuarios.models';
import { SalvarClienteService } from 'src/app/services/salvar-cliente.service';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit {

  idGlobal: any
  form: FormGroup;
  clientes: usuario[];
  error = "Este campo é obrigatorio";


  constructor(
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    private formBuilder: FormBuilder,
    private salvarClientesService : SalvarClienteService,
    @Inject(MAT_DIALOG_DATA) public data: usuario
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ // defenindo elementos
      d_nome: new FormControl ('', [Validators.required]),
      d_email: new FormControl ('',  [Validators.required, Validators.email]), //Validando os Inputs
      d_tel: new FormControl ('',  [Validators.required]),
      d_id: [''] 
    })

    this.form.controls['d_id'].setValue(this.data.id)
    this.form.controls['d_nome'].setValue(this.data.nome);
    this.form.controls['d_email'].setValue(this.data.email);
    this.form.controls['d_tel'].setValue(this.data.tel);

  }



  editarCliente(){

    let dataDialog: usuario = { 

    id: this.form.controls['d_id'].value,
    nome: this.form.controls['d_nome'].value,
    email: this.form.controls['d_email'].value,
    tel: this.form.controls['d_tel'].value

    };

    console.log(this.data);

    this.data.id = this.form.controls['d_id'].value,
    this.data.nome = this.form.controls['d_nome'].value,
    this.data.email = this.form.controls['d_email'].value,
    this.data.tel = this.form.controls['d_tel'].value


    this.dialogRef.close(this.data);


  }
  
  cancelar(): void {
    this.dialogRef.close();
  }

  validaEmail(): String{
    
    if(this.form.controls["d_email"].hasError('required')){
      return this.error;
    }
    return this.form.controls["d_email"].hasError('email') ? "E-mail inválido" : '';
  }
  

  

 


}
