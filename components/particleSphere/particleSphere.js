import * as Utils from "../utils/utils.js";
import {Particle} from "./particle.js";
import * as Mouse from "../utils/mouse.js";

export var particles;
let numberOfParticles = 70;     // Imam 70 kockica
let particlePalette = ["rgb(122, 162, 114)", "rgb(78, 110, 88)", "rgb(76, 133, 119)", "rgb(166, 236, 166)", "rgb(122, 223, 187)"];

let hasInitialized = false;     

export function initialize(){
    emptyTheArray();
    addParticles();
}

function emptyTheArray() { particles = []; }

function addParticles(){
    for(let i = 0; i < numberOfParticles; i++)
        addAParticle();
}

export function addAParticle(){
    let color = Utils.randomColorFromPalette(particlePalette);
    particles.push(new Particle(color));
}

export function update(){
    initialiseWhenMouseIsOnScreen();    // Jer kad se refresh-a page sa dugmetom koordinate miša su undefined (iznad su prozora stranice)
    updateParticles();
}

function updateParticles(){
    particles.forEach(particle => { particle.update(); });
}

function initialiseWhenMouseIsOnScreen(){
    if(!hasInitialized && isMouseOnScreen()){
        initialize();
        hasInitialized = true;
    }
}

function isMouseOnScreen(){
    return (Mouse.x != undefined) && (Mouse.y != undefined);
}

export function removeParticle(particle){
    let index = particles.indexOf(particle);
    if (index > -1) 
        particles.splice(index, 1);
}
