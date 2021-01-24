import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { timeStamp } from 'console';
import {Viewer3dService} from '../services/viewer3d.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('rendererCanvas2', {static: true})
  public rendererCanvas2: ElementRef<HTMLCanvasElement>;


  public constructor(private viewer: Viewer3dService) {
  }

  public ngOnInit(): void {
    this.viewer.createScene(this.rendererCanvas, 'https://cdn.coursesaver.com/files/Part26-4.STL');
    this.viewer.animate();

    this.viewer.createScene(this.rendererCanvas2, 'https://cdn.coursesaver.com/files/Part26-4.STL');
    this.viewer.animate();
  }

}
