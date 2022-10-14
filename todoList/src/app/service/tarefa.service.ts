import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators'
import {Tarefa} from '../models/tarefa'

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

    // api rest fake
    url = 'http://localhost:3000/Tarefas' 

  constructor(private httpClient:HttpClient) { }
  httpOption = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  get():Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(this.url).pipe(
      retry(2),
      catchError(this.handleError))

  }

  //Salva uma tarefa
  save(Tarefa:Tarefa):Observable<Tarefa>{
    return this.httpClient.post<Tarefa>(this.url,JSON.stringify(Tarefa),this.httpOption).pipe(
      retry(2),
      catchError(this.handleError)
    )


  }

    //Atualiza a tarefa
  update(Tarefa:Tarefa):Observable<Tarefa>{
    return this.httpClient.put<Tarefa>(this.url + '/' + Tarefa.id, JSON.stringify(Tarefa),this.httpOption).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Deleta a tarefa
  delete(Tarefa:Tarefa){
    return this.httpClient.delete<Tarefa>(this.url + '/' + Tarefa.id, this.httpOption).pipe(
      retry(1),
      catchError(this.handleError)

    )
  }


  handleError(error:HttpErrorResponse){
    let errorMessage= '';
    if(error.error instanceof ErrorEvent){
      //Erro do lado do cliente
      errorMessage = error.error.message
    }else{
      //erro do lado do servidor
      errorMessage = `Código de erro: ${error.status},Mensagem: $error,message}`;
    }

    return throwError(errorMessage)
  
  }
  
  
}

