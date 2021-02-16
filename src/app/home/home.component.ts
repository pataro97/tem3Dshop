import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Viewer3dService} from '../services/viewer3d/viewer3d.service';
import * as jQuery from 'jquery';
// Firebase
import { DbfireService } from '../services/firebase/dbfire.service';
// fake users json
import * as users from '../../assets/json/users.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showCanvas = false;
  result: any;
  stl: any;
  // Pulico para que pueda acceder en modo prod (ngFor)
  public jsusers: any[] = users.results;
  lastId: string;
  public constructor(private viewer: Viewer3dService, private dbfireService: DbfireService) {}

  public ngOnInit(): void {
    // imagen firebase
    this.result = this.dbfireService.getURL('/img/temporizador.PNG');

    // obtener JSON
    // for(const key in users) {
    //   this.jsusers = users[key].results;
    // }

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
    // ocultar canvas anterior
    if(this.lastId) {
      this.viewer.clearScene();
      $('#containerC'+this.lastId).attr("hidden",'false');
      $('#carouselName'+this.lastId).hide().css("display", "block");
    }
    // crear escena canvas
    // this.stl = this.dbfireService.getURL('/STL/Temporizador.stl'); // cargar stl
    this.viewer.createScene(rendererCanvas, 'https://cdn.coursesaver.com/files/Part26-4.STL', this.showCanvas);
    this.viewer.animate();
    this.lastId = canvasNam;
  }

}
