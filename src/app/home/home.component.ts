import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { timeStamp } from 'console';
import {Viewer3dService} from '../services/viewer3d.service';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showCanvas = false;



  @ViewChild('rendererCanvas1', {static: true}) //true or false si no es estatico y depende de una variable(*ngIf)
  public rendererCanvas1: ElementRef<HTMLCanvasElement>;


  public constructor(private viewer: Viewer3dService) {
  }

  public ngOnInit(): void {
    
  }

  public loadCanvas(id) {
    var target = id.target || id.srcElement || id.currentTarget;
    var idAttr = target.attributes.id; //selecciona atributo
    var value = idAttr.nodeValue; //seleciona lo que hay dentro del atributo id
    
    alert(value)
    // rend canvas

    $('#canvas').removeAttr('hidden');
    $('#carousel').hide().css("display", "none");
    this.viewer.createScene(this.rendererCanvas1, 'https://cdn.coursesaver.com/files/Part26-4.STL', this.showCanvas);
    this.viewer.animate();
  }

}
