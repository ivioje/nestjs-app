import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TodoServiceService } from './todo-service.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  constructor(private todoService: TodoServiceService){}

  taskPaneOpen:boolean = false;
  updateModalOpen:boolean = false;
  todoList: any = [];
  updatedTodoList: any = {};
  submitted = false;
  createForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    creator: new FormControl('', [Validators.required])
  });
  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    creator: new FormControl('', [Validators.required]),
    todoId: new FormControl('')
  });

  ngOnInit() {
    this.todoService.readTodos().subscribe({
      next: (items: any) => {
        this.todoList = items;
        console.log(this.todoList);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openUpdateModal(id: number) {
    if(!id) return;

    this.updateModalOpen = true;
    this.taskPaneOpen = false;
  }

  createTodoItem() {
    const data = {...this.createForm.value};

    if(!data.title || !data.creator || !data.description || !data.date){
        return alert('Please fill in all fields!');
    }
    if(data.description.length < 10) return alert('Task description is too short');
    if(data.title.length < 5) return alert('Title is too short');

    this.todoService.createTodo(data).subscribe((res: any) => {
      this.todoService.readTodos().subscribe(items => this.todoList = items);
      alert('Your task has been saved!');
      console.log(res);
      this.createForm.reset();
    }, e => {
      alert('An error occured. Try again...');
      console.log(e);
    })
  }

  deleteTodoItem(id: number) {
    if(!id) return;
    
    this.todoService.deleteTodo(id).subscribe((res: any) => {
      this.todoService.readTodos().subscribe(item => this.todoList = item);
      alert('Your task has been deleted successfully!');
    }, e => {
      alert('An error has occured. Try again later...');
      console.log(e);
    })
  }

  editTodoItem(todoItem: any) {
    if(!todoItem || !todoItem.id) return console.log('Invalid todo item');

    this.updatedTodoList = {...todoItem};
    this.openUpdateModal(todoItem);
  }

  updateTodoItem() {
    if (!this.updatedTodoList || !this.updatedTodoList.id) {
      return console.log('Invalid todo item');
    }
  
    if (this.updateForm.invalid) {
      return alert('Please fill in all fields!');
    }
  
    this.updateForm.patchValue({
      todoId: this.updatedTodoList.id
    });
  
    const updatedTodo = this.updateForm.value;
  
    this.todoService.updateTodos(updatedTodo, updatedTodo.todoId).subscribe(
      (res: any) => {
        this.todoService.readTodos().subscribe(item => this.todoList = item);
        alert('Successfully updated task!');
        this.updateForm.reset();
        this.updateModalOpen = false;
        console.log(res);
      },
      (e) => {
        alert('Error updating task');
        console.log(e);
      }
    );
  }
  

}
