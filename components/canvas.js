import * as ParticleSphere from "./particleSphere/particleSphere.js";
import * as SquareIndex from "./squareIndex/squareIndex.js"

let canvas = document.querySelector("canvas");
export let context = canvas.getContext("2d");

export function start(){ 
  restartCanvas(); 
  animate();
}                  

function restartCanvas(){
  resizeCanvas();
  ParticleSphere.initialize();
  SquareIndex.initialize();
}

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function animate(){
  requestAnimationFrame(animate);     // Da bih pozivao ovu metodu svaki frame
  clearTheScreen();
  ParticleSphere.update();
  SquareIndex.update();
}

function clearTheScreen(){
  context.fillStyle = "rgba(255, 255, 255, 0.2)";           // stavljam opacity na 0.2 za trail effect
  context.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", () => restartCanvas());
