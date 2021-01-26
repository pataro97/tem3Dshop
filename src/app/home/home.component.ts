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



  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;


  public constructor(private viewer: Viewer3dService) {
  }

  public ngOnInit(): void {
    
  }

  public loadCanvas(): void {
    $('#canvas').removeAttr('hidden');
    $('#carousel').hide().css("display", "none");
    this.viewer.createScene(this.rendererCanvas, 'https://cdn.coursesaver.com/files/Part26-4.STL');
    this.viewer.animate();
  }

}
