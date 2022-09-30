import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuario } from '../models/criar-usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarClienteService {

  // fazendo o progress spiner
  private _loading = new BehaviorSubject<boolean>(false) 
  public readonly loading = this._loading.asObservable();

  private listaClientes: any[]; // criando um array de lista de clientes
  private url ="http://localhost:3000/clientes"; // para chamar o local de armazenamento do service


  constructor(private httpClient: HttpClient) { 
    this.listaClientes = [] // lista de cliente
  }


  //----------------------Funçoes do Spinner----------------------

  showLoading(){
    this._loading.next(true);
  }
  hideLoading(){
    this._loading.next(false);
  }

  //----------------Função para pegar Cliente---------------------

  get clientes(){
    return this.listaClientes;
  }

 //-----------------Função para Ler Cliente----------------------

  lerClientes(): Observable<usuario[]>{
    return this.httpClient.get<usuario[]>(this.url);
  }

 //-----------------Função para Salvar Cliente----------------------

  salvarCliente(cliente: usuario): Observable<usuario>{
    return this.httpClient.post<usuario>(this.url, cliente);
  }

  //-----------------Função para Excluir Cliente----------------------

  excluirCliente(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  //-----------------Função para Editar Cliente----------------------

  editarCliente(usuario: usuario){
    return this.httpClient.put(`${this.url}/${usuario.id}`, usuario);
  }

  //-----------------Função para pegar o id do Cliente----------------------

  pegarId(id: number): Observable<usuario>{
    return this.httpClient.get<usuario>(`${this.url}/${id}`);
  }

}
