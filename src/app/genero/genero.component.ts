import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genero } from '../models/criar-generos.models';
import { SalvarGeneroService } from '../services/salvar-genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  formCadastrarGenero: FormGroup;
  error = "Este campo é obrigatorio"
  generos: Genero[];

  constructor(
    private formBuilder: FormBuilder,
    private salvarGeneroService: SalvarGeneroService
    )
  { }


  ngOnInit(): void {
    this.formCadastrarGenero = this.formBuilder.group({
      genero: new FormControl('', [Validators.required])
    })

   this.salvarGeneroService.lerGeneros().subscribe({
    next: (generos: Genero[]) => {
      this.generos = generos;

      console.log(this.generos);
      
    },
    error: () => {
      console.log("erro ao ler Generos");
    }
   })

  }


  salvarDadosGeneros(){

    const id = this.generos[this.generos.length - 1].id +1;

    const genero = this.formCadastrarGenero.controls['genero'].value;

    const tipoFilme: Genero = {id: id, generoNome: genero}

    console.log(tipoFilme);

    this.salvarGeneroService.salvarGeneros(tipoFilme).subscribe({
      next: () => {
        console.log("sucesso");
        this.ngOnInit();
      },
      error: () => {
        console.log("erro");
      }
    })
  }


  excluirGeneros(id: any){
    this.salvarGeneroService.excluirGeneros(id).subscribe({
      next: () => {
        console.log("Deletado");
        this.ngOnInit();
      },
      error: () =>{
        console.log("erro no delete");
        
      }
    })
  }






}
