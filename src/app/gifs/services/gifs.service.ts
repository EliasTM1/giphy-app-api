// Imports
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

// Assign this service to the root in order to make it globally available 
@Injectable({
  providedIn: 'root'
})

// This is the service
export class GifsService {

private _historial : string[] = []
private apiKey     : string ='GMlRGZTOMFv8y3KsDyIzDibLBGEQH6Z7'
private urlService : string = 'https://api.giphy.com/v1/gifs'

public resultados: Gif[] =[]

get historial() {
  return [...this._historial]
}

//  This is how yo inject modules into services, inside the constructor
//  The service is only excecuted once, they worjk like singletons
constructor(private http: HttpClient) {


  //  To make Typescript to trust us we need to use !
  this._historial =  JSON.parse(localStorage.getItem('historial')!) || []
  this.resultados =  JSON.parse(localStorage.getItem('resultados')!) || []
  console.log(this.resultados)
   // if(localStorage.getItem('historial')){
  //   this._historial = JSON.parse(localStorage.getItem('historial')!)
  // }
}

buscarGifs(query:string){
  // Validations
  query = query.toLocaleLowerCase().trim()
  if(query == ''){
    return
  }
  if(!this._historial.includes(query)){
    this._historial.unshift(query)
    this._historial = this._historial.splice(0,9)
// Save to local storage 

localStorage.setItem('historial', JSON.stringify( this._historial))
}
const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit', '50')
  .set('q',query)


// Use HttpPamas object to store the object in order to create a cleaner URL
  // API call 
  this.http.get<SearchGifsResponse>(`${this.urlService}/search`, {params})
    .subscribe( ( resp  ) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify( this.resultados))
    })
}

}
