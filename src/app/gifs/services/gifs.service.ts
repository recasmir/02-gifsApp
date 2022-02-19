import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


      //el servicio va ha ser available en toda la aplicacion ya que está en root. Será un servicio global.

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string='g78L5faxt5g5IIx5ixC57TH3WNMcKqLA';
  private servicioUrl:string='http://api.giphy.com/v1/gifs';

  private _historial:string[]=[];

  public resultados:Gif[]=[];

  get historial(){
    return [...this._historial];
  }

      //el constructor se ejecuta la primera vez el que el servicio es llamado, aunque después se llame el servicio más veces. Este es el lugar ideal para cargar el local storage, y que el usuario lo vea al refresacar la página

  constructor(private http: HttpClient){

      //si el historial existe, continua. Pero tenemos el inconveniente que se tiene que convertir el historial, ya que el getItem dará un string y el historial es un array. Entonces le pasamos un JSON.parse que convertirá un objecto stringificado en lo que era al principio (hace lo opuesto de stringify). Pero solo lo hace si es un objecto literal, arreglo, strings o primitivos. Si grabamos un instancia de una clase, la clase regresará a su forma de un objeto.
      //Le añadimos ! al final porque puede regresar nulo, le decimos que no regresará nulo ya que estamos haciendo el if par amira si existe.

      // if(localStorage.getItem('historial')){
      //   this._historial=JSON.parse(localStorage.getItem('historial')!);
      // }

      //esta linea equivale a las dos de arriba. EL local storage puede regresar null  ---> || [] y si regresa null retornemos un arreglo vacio. Pero tb tenemos que añadir el ! para que typescript confie en nosotros que esto no va a estar vacio.

  this._historial=JSON.parse(localStorage.getItem('historial')!) || [];

  this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
 }
 
      //accepta la función siempre que haya algo, si es empty no la acepta
 
  buscarGifs(query:string=''){

    query = query.trim().toLowerCase();
   
      //si no existe el input, lo inserta, si existe no. Así no hay repeticiones
   
    if(!this._historial.includes(query)){
      this._historial.unshift(query)
    
      //limitamos la lista a 10 búsquedas
    
      this._historial=this._historial.splice(0,10);

      //para almacenar nuestras búsquedas en el local storage. Estaran ahí hasta qe el usuario borre el cache del ordenador o similar.
      //No tenemos que importar e JSON porque pertenece al javascript. Le añadimos el método de stringify, el que hará que se convierta en una string cualquiera de la información que ponemos dentro. Ahora ponemos el array de historial y aunque sea un array y el setItem del localstorage nos pida un string, funcionará.

      localStorage.setItem('historial', JSON.stringify(this._historial));

   }

  const params=new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
  .subscribe((resp)=>{
    this.resultados=resp.data;

      //grabamos en local setorage los últimos gifs que hemos buscado

    localStorage.setItem('resultados', JSON.stringify(this.resultados));
   })
 }

}
