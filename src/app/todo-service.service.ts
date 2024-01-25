import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  baseUrl = "http://localhost:3000/todo-api"

  constructor(private http: HttpClient) { }

  createTodo(params: any) {
    return this.http.post(`${this.baseUrl}/create`, params)
  }

  readTodos() {
    return this.http.get(`${this.baseUrl}/all`)
  }

  updateTodos(params: any, id: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, params)
  }

  deleteTodo(id: any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
}
