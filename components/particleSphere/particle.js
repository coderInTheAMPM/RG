import * as Utils from "../utils/utils.js";
import {context} from "../canvas.js";
import * as Mouse from "../utils/mouse.js";

export class Particle{
    constructor(color){
        this.color = color;
        this.x = undefined;
        this.y = undefined; 
    
        this.width = Utils.randomNumberInRange(3, 5);           // Ove partikle su zapravo linije koje se kreću vektorom skoro paralelnim toj liniji, ovo određuje dužinu te linije
        this.radians = Math.random() * 2 * Math.PI;             // Ugao u radijanima zbog Math.sin i Math.cos funkcija
        this.velocity = Utils.randomFloatInRange(0.04, 0.07);   // Brzina po kojoj se okreću
        this.distanceFromCenter = Utils.randomNumberInRange(50, 100);
                                
        // Ovo sam uveo kako se partikle ne bi odma teleportovale do miša, nego da bude više smooth
        this.lastMousePosition = {x: Mouse.x, y: Mouse.y};
        this.lastPoint = undefined;
        this.followSpeed = 0.05;    
    }

    update(){
        this.calculateMovement();
        this.draw();
    }

    calculateMovement(){
        this.lastPoint = {x: this.x, y: this.y};
        this.radians += this.velocity;
        this.lastMousePosition.x += (Mouse.x - this.lastMousePosition.x) * this.followSpeed;
        this.lastMousePosition.y += (Mouse.y - this.lastMousePosition.y) * this.followSpeed;
        this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromCenter;
    }

    draw(){
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.moveTo(this.lastPoint.x, this.lastPoint.y);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.closePath();
    }
}
