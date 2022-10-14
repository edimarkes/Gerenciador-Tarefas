import { Component, OnInit } from '@angular/core';
import { TarefaService } from './service/tarefa.service';
import { Tarefa } from './models/tarefa';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoList';

  Tarefa = {} as Tarefa;
  Tarefas!: Tarefa[];
  constructor(private TarefaService: TarefaService) { }
  ngOnInit() {
    this.get();

  }

  get() {
    this.TarefaService.get().subscribe((listaTarefas: Tarefa[]) => {
      this.Tarefas = listaTarefas

    });
  }

  save(dados: NgForm) {
    //Verifica se uma tarefa será atualizada ou criada
    if (this.Tarefa.id !== undefined) {
      this.TarefaService.update(this.Tarefa).subscribe(() => {
        this.cleanForm(dados)
      });

    } else {
      this.TarefaService.save(this.Tarefa).subscribe(() => {
        this.cleanForm(dados)
      });

    }

  }
  delete(Tarefa: Tarefa){
    this.TarefaService.delete(Tarefa).subscribe(() => {
      this.get();
    });

  }
  //Update da Tarefa
  edit(Tarefa: Tarefa){
    this.Tarefa = {...Tarefa};
  }

  cleanForm(dados: NgForm) {
    dados.resetForm();
    this.get();
    this.Tarefa = {} as Tarefa
  }



}
