import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../models/criar-generos.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarGeneroService {

  private listaGeneros: any[]; // criando um array de lista de generos
  private url = "http://localhost:3000/generos"; // para chamar o local de armazenamento do service

  constructor(private httpClient: HttpClient) {
    this.listaGeneros = []
  }


  get generos(){
    return this.listaGeneros;
  }

  lerGeneros(): Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(this.url);
  }


  salvarGeneros(genero: Genero): Observable<Genero>{
    return this.httpClient.post<Genero>(this.url, genero);
  }

  excluirGeneros(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editarGenero(genero: Genero){
    return this.httpClient.put(`${this.url}/${genero.id}`, genero);
  }

  pegarId(id: number): Observable<Genero>{
    return this.httpClient.get<Genero>(`${this.url}/${id}`);
  }


}
