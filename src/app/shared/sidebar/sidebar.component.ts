import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [

  ]
})
export class SidebarComponent  {
  
 

  get historial () :string[] {
   return this.GifsService.historial
  }

  constructor(private GifsService: GifsService) { }

  buscar(items:string){
    console.log(items)
    this.GifsService.buscarGifs(items)
  }



}
