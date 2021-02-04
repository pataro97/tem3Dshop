import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Viewer3dService} from '../services/viewer3d/viewer3d.service';
import * as jQuery from 'jquery';
// Firebase
import { DbfireService } from '../services/firebase/dbfire.service';
import { TIMEOUT } from 'dns';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showCanvas = false;
  result: any;
  stl: any;
  usuarios: any[] = ['Pepe', 'Juan', 'Manolo', 'Antonio'];


  public constructor(private viewer: Viewer3dService, private dbfireService: DbfireService) {}

  public ngOnInit(): void {
    this.result = this.dbfireService.getURL('/img/temporizador.PNG');
  }

  public loadCanvas(id) {
    // obtener numero canvas
    var target = id.target || id.srcElement || id.currentTarget;
    var idAttr = target.attributes.id; //selecciona atributo
    var canvasNam = idAttr.nodeValue; //seleciona lo que hay dentro del atributo id
    // extraer numero dentro del string id
    // -------------------------------------------------------
    var rendererCanvas = document.querySelector('#renderCanvas'+canvasNam) as HTMLCanvasElement;
    $('#containerC'+canvasNam).removeAttr('hidden');
    $('#carouselName'+canvasNam).hide().css("display", "none");
    // crear escena canvas
    // this.stl = this.dbfireService.getURL('/STL/Temporizador.stl'); // cargar stl
    this.viewer.createScene(rendererCanvas, this.stl, this.showCanvas);
    this.viewer.animate();
    
  }

}
