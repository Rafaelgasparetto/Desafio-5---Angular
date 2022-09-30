import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genero } from '../models/criar-generos.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarGeneroService {

  // fazendo o progress spiner
  private _loading = new BehaviorSubject<boolean>(false) 
  public readonly loading = this._loading.asObservable();

  private listaGeneros: any[]; // criando um array de lista de generos
  private url = "http://localhost:3000/generos"; // para chamar o local de armazenamento do service

  constructor(private httpClient: HttpClient) {
    this.listaGeneros = []
  }

  showLoading(){
    this._loading.next(true);
  }

  hideLoading(){
    this._loading.next(false);
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
