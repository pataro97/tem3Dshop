import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { timeStamp } from 'console';
import {Viewer3dService} from '../services/viewer3d/viewer3d.service';
import * as jQuery from 'jquery';
// Firebase
import { DbfireService } from '../services/firebase/dbfire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showCanvas = false;
  result: any;

  // @ViewChild('rendererCanvas1', {static: true}) //true or false si no es estatico y depende de una variable(*ngIf)
  // public rendererCanvas: ElementRef<HTMLCanvasElement>;


  public constructor(private viewer: Viewer3dService, private dbfireService: DbfireService) {
  }

  public ngOnInit(): void {
    this.result = this.dbfireService.getURL();
    
  }

  public loadCanvas(id) {
    // obtener numero canvas
    var target = id.target || id.srcElement || id.currentTarget;
    var idAttr = target.attributes.id; //selecciona atributo
    var numCanvas = idAttr.nodeValue; //seleciona lo que hay dentro del atributo id
    // extraer numero del canvas
    var regex = /(\d+)/g;
    numCanvas = numCanvas.match(regex)
    // -------------------------------------------------------
    var rendererCanvas = document.querySelector('#renderCanvas'+numCanvas) as HTMLCanvasElement;
    $('#containerC'+numCanvas).removeAttr('hidden');
    $('#carousel'+numCanvas).hide().css("display", "none");
    this.viewer.createScene(rendererCanvas, this.result, this.showCanvas);
    this.viewer.animate();
  }

}
