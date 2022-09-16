import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  formCadastrarFilmes: FormGroup; // o FormGoup é para Agrupar os elementos
  error = "Este campo é obrigatorio"

  constructor(
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCadastrarFilmes = this.formBuilder.group({
    titulo: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required])
    })
  }

  SalvarDadosFilmes(){
    console.log('clicou');
    
  }

}
