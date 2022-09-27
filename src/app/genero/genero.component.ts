import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalvarGeneroService } from '../services/salvar-genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  formCadastrarGenero: FormGroup;
  error = "Este campo é obrigatorio"

  constructor(
    private formBuilder: FormBuilder,
    private salvarGeneroService: SalvarGeneroService
    )
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
