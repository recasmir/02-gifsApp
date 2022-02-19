import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent{

  //@ViewChild('nombre del elemento q buscamos')
  //ponemos ! para indicar que estamos seguros que este elemento tendrá algo. Non-null assetion operator.

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

//ahora ya podemos acceder a todas la propiedades y métodos del servicio
  constructor(private gifsService:GifsService){}

  buscar(){
    const valor=this.txtBuscar.nativeElement.value;

    //si no añadimos nada al input, no se añadirá nada al historial
    if(valor.trim().length===0){
      return;
    }
    
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value='';
  }


}
