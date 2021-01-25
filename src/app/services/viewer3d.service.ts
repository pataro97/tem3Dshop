import * as THREE from 'three';
import {ElementRef, Injectable, NgZone, OnDestroy} from '@angular/core';
import { Mesh } from 'three';

var STLLoader = require('three-stl-loader')(THREE)
var loader = new STLLoader()
var OrbitControls = require('three-orbit-controls')(THREE)

@Injectable({
  providedIn: 'root'
})
export class Viewer3dService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  // private light: THREE.AmbientLight;

  
  private controls: any;
  private frameId: number = null;

  public constructor(private ngZone: NgZone) {
    window.onresize = (e) =>
    {
        //ngZone.run will help to run change detection
        this.ngZone.run(() => {
            this.resize();
        });
    };
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>, model): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: false,    // transparent background
      antialias: true // smooth edges
    });

    // -------------- size windows 
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setSize(300, 300);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );


    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    // this.light = new THREE.AmbientLight(0xffffff);
    var light = new THREE.DirectionalLight(0xffffff, 2.0);
    
    // this.light.position.z = 10;
    // this.light.position.z = 5;
    this.scene.add(light);


    // controls
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);


    // load stl
    loader.load(model, geometry => {
      // var material = new THREE.MeshPhongMaterial( { color: 0xBEBEBE } );
      var material = new THREE.MeshNormalMaterial({
        
      })
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = -1.5
      this.scene.add(mesh)
    })


  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    // this.ngZone.runOutsideAngular(() => {
    //   if (document.readyState !== 'loading') {
    //     this.render();
    //   } else {
    //     window.addEventListener('DOMContentLoaded', () => {
    //       this.render();
    //     });
    //   }

    //   window.addEventListener('resize', () => {
    //     this.resize();
    //   });
    // });
    this.camera.lookAt( this.scene.position );

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(_ => this.animate());
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.camera.rotation.x += 0.01;
    this.camera.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // this.renderer.setSize(width, height);
  }


}
