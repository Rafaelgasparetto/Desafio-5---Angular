import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/criar-usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class SalvarClienteService {

  private listaClientes: any[]; // criando um array de lista de clientes
  private url ="http://localhost:3000/clientes"; // para chamar o local de armazenamento do service


  constructor(private httpClient: HttpClient) { 
    this.listaClientes = [] 
  }


  get clientes(){
    return this.listaClientes;
  }


  lerClientes(): Observable<usuario[]>{
    return this.httpClient.get<usuario[]>(this.url);
  }

  salvarCliente(cliente: usuario): Observable<usuario>{
    return this.httpClient.post<usuario>(this.url, cliente);
  }

  excluirCliente(id: any){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editarCliente(usuario: usuario){
    return this.httpClient.put(`${this.url}/${usuario.id}`, usuario);
  }

  pegarId(id: number): Observable<usuario>{
    return this.httpClient.get<usuario>(`${this.url}/${id}`);
  }



}
