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
      d_nome: ['', [Validators.required]],
      d_email: ['',  [Validators.required, Validators.email]], //Validando os Inputs
      d_tel: ['',  [Validators.required]], 
    })
    console.log(this.data);
    
    this.idGlobal = this.data.id

    console.log(this.data.nome);
    
    this.form.controls['d_nome'].setValue(this.data.nome);
    this.form.controls['d_email'].setValue(this.data.email);
    this.form.controls['d_tel'].setValue(this.data.tel);


  }

  cancelar(): void {
    this.dialogRef.close();
  }

  puxarInput(id: any, nome: String, email: String, tel: String){


    // this.form.controls[""]



    // this.salvarClientesService.editarCliente.subscribe({
    //   next: () => {
    //     this.idGlobal = id

    //     this.form.controls["d_name"].setValue(nome);
    //     this.form.controls["d_email"].setValue(email);
    //     this.form.controls["tel"].setValue(tel);
    //   },
    //   error: (){
    //     console.log("error");
        
    //   }
    // })


    // this.idGlobal = id

    // this.form.controls["d_name"].setValue(nome);
    // this.form.controls["d_email"].setValue(email);
    // this.form.controls["tel"].setValue(tel);

  }
  
  
  

  

 


}
