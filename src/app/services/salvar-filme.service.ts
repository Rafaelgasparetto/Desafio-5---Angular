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

  private listaFilmes: any[];
  private url = "http://localhost:3000/filmes";



  constructor(private httpClient: HttpClient) {
    this.listaFilmes = []
  }

  showLoading(){
    this._loading.next(true);
  }

  hideLoading(){
    this._loading.next(false);
  }

  get filmes(){
    return this.listaFilmes;
  }

  lerFilmes(): Observable<Filme[]>{
    return this.httpClient.get<Filme[]>(this.url);
  }

  salvarFilmes(filme: Filme): Observable<Filme>{
    return this.httpClient.post<Filme>(this.url, filme);
  } 

  excluirFilmes(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editarFilmes(filme: Filme){
    return this.httpClient.put(`${this.url}/${filme.id}`, filme);
  }

  pegarId(id: number): Observable<Filme>{
    return this.httpClient.get<Filme>(`${this.url}/${id}`);
  }

}
