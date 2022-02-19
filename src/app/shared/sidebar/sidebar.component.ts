import { GifsService } from './../../gifs/services/gifs.service';
import { Component, Input, OnInit } from '@angular/core';
import { Gif } from 'src/app/gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  get historial(){
    return this.gifsService.historial;
  }
  constructor(private gifsService:GifsService) { }

  buscar(termino:string){
    this.gifsService.buscarGifs(termino);
  }

  ngOnInit(): void {
  }

}
