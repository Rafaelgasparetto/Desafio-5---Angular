import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filme } from '../models/criar-filmes.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarFilmeService {

  // fazendo o progress spiner
  private _loading = new BehaviorSubject<boolean>(false) 
  public readonly loading = this._loading.asObservable();

  private listaFilmes: any[]; // criando um array de lista de filmes
  private url = "http://localhost:3000/filmes"; // para chamar o local de armazenamento do service



  constructor(private httpClient: HttpClient) {
    this.listaFilmes = [] // lista de filmes
  }

  //----------------------Funçoes do Spinner----------------------

  showLoading(){
    this._loading.next(true);
  }

  hideLoading(){
    this._loading.next(false);
  }

  //----------------Função para pegar Filmes---------------------

  get filmes(){
    return this.listaFilmes;
  }

  //----------------Função para Ler Filmes---------------------

  lerFilmes(): Observable<Filme[]>{
    return this.httpClient.get<Filme[]>(this.url);
  }

  //----------------Função para Salvar Filme---------------------

  salvarFilmes(filme: Filme): Observable<Filme>{
    return this.httpClient.post<Filme>(this.url, filme);
  } 

  //----------------Função para Excluir Filme---------------------

  excluirFilmes(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  //----------------Função para Editar Filme---------------------

  editarFilmes(filme: Filme){
    return this.httpClient.put(`${this.url}/${filme.id}`, filme);
  }

  //-----------------Função para pegar o id do Filme----------------------

  pegarId(id: number): Observable<Filme>{
    return this.httpClient.get<Filme>(`${this.url}/${id}`);
  }

}
