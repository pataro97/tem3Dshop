import * as THREE from 'three';
import {ElementRef, Injectable, NgZone, OnDestroy} from '@angular/core';
import { Material, Mesh } from 'three';
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
  private light = new THREE.DirectionalLight( 0xffffff, 1 );
  // private light: THREE.AmbientLight;

  
  private controls: any;
  private frameId: number = null;

  public constructor(private ngZone: NgZone) {
   
  }

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  public createScene(canvas: HTMLCanvasElement, model, canvasStatus): void {

    window.onresize = (e) =>
    {
        //ngZone.run will help to run change detection
        this.ngZone.run(() => {
          if(canvasStatus) {
            this.resize();
          }
        });
    };
    // The first step is to get the reference of the canvas element from our HTML document
    // this.canvas = canvas.nativeElement; parametro: canvas: ElementRef<HTMLCanvasElement>
    this.canvas = canvas;


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
    this.scene.background = new THREE.Color( 0xe0e0e0 );
    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );


    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    // var light = new THREE.AmbientLight(0xffffff, 2.0);
    this.light.position.copy( this.camera.position )
    // light.position.z = 10;
    this.light.position.set(0, 1, 0); 
    this.scene.add(this.light);


    // controls
    this.controls = new OrbitControls(this.camera,this.renderer.domElement);


    // load stl
    loader.load(model, geometry => {
      // var material = new THREE.Material();
      // material.visible = true;

      var material = new THREE.MeshPhysicalMaterial({});
      material.color = new THREE.Color(0x2194ce);
      material.emissive = new THREE.Color(0x70659);
      material.roughness = 1;
      material.metalness = 1;
      material.reflectivity = 1;
      material.clearcoat = 1;
      // var material = new THREE.MeshNormalMaterial({
        
      // })


      // var material = new THREE.MeshPhysicalMaterial({
      //   color:0xf3ffe2
      // })
      
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = -1.5
      this.scene.add(mesh)
    })

    // var clear
    canvasStatus = false;
    // this.controls.addEventListener("change", this.light_update);
  }



  
  public animate(): void {

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(_ => this.animate());
  }

  public light_update(): void {
    console.log(this.light.position);
    // this.light.position.copy( this.controls.position )
  }

  public resize(): void {
    this.camera.updateProjectionMatrix();

    // this.light.position.copy( this.camera.position )
    this.scene.add(this.light);

    // this.renderer.setSize(width, height);
  }

  public clearScene() {
    while(this.scene.children.length > 0){ 
      this.scene.remove(this.scene.children[0]); 
    }
  }

}
