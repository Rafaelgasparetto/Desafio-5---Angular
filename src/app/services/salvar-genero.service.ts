import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/criar-generos.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarGeneroService {

  private listaGeneros: any[]; // criando um array de lista de generos
  private url = "http://localhost:3000/genero"; // para chamar o local de armazenamento do service

  constructor(private httpCliente: HttpClient) {
    this.listaGeneros = [];
  }


  get generos(){
    return this.listaGeneros;
  }

  lerGeneros(): Observable<Genero[]>{
    return this.httpCliente.get<Genero[]>(this.url);
  }

  salvarGeneros(genero: Genero): Observable<Genero>{
    return this.httpCliente.post<Genero>(this.url, genero);
  }






}
