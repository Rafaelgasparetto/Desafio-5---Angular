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
  private url = "https://633741355327df4c43d23265.mockapi.io/genero"; // para chamar o local de armazenamento do service

  constructor(private httpClient: HttpClient) {
    this.listaGeneros = [] // lista de Genero
  }


  //----------------------Funçoes do Spinner----------------------

  showLoading(){
    this._loading.next(true);
  }

  hideLoading(){
    this._loading.next(false);
  }

  //----------------Função para pegar Genero---------------------

  get generos(){
    return this.listaGeneros;
  }

  //----------------Função para ler Genero---------------------

  lerGeneros(): Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(this.url);
  }

  //----------------Função para Salvar Genero---------------------

  salvarGeneros(genero: Genero): Observable<Genero>{
    return this.httpClient.post<Genero>(this.url, genero);
  }

  //----------------Função para excluir Genero---------------------  

  excluirGeneros(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  //----------------Função para editar Genero---------------------

  editarGenero(genero: Genero){
    return this.httpClient.put(`${this.url}/${genero.id}`, genero);
  }

  //-----------------Função para pegar o id do Genero----------------------

  pegarId(id: number): Observable<Genero>{
    return this.httpClient.get<Genero>(`${this.url}/${id}`);
  }


}
