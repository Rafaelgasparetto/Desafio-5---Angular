import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  formCadastrarGenero: FormGroup;
  error = "Este campo é obrigatorio"

  constructor(
    private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.formCadastrarGenero = this.formBuilder.group({
      genero: new FormControl('', [Validators.required])
    })
  }


  SalvarDadosGeneros(){
    console.log("clicou");
    
  }


}
