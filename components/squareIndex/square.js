import { context } from "../canvas.js";
import * as ParticleSphere from "../particleSphere/particleSphere.js";
import * as Utils from "../utils/utils.js";

export class Square{
    constructor(x, y, squareEdge){
        this.x = x;
        this.y = y;
        
        this.isFilled = false;
        this.originalColor = "rgb(128, 128, 128)";     // Originalna boja siva
        this.takenColor;
        this.color = this.originalColor;

        this.squareEdge = squareEdge;

        this.shouldMelt = false;    // Prva ideja je bila da se plava boja topi i greje u crvenu ali zelena koja prelazi u žuto-crvenu izgleda bolje i daje nekakav vajb godišnjih doba
    }

    update(){
        this.draw();

        if(this.shouldMelt)
            this.melt();
        else{
            this.checkIfShouldBeMelting();
            this.checkSquareParticleCollision();
        }
    }

    draw(){
        this.determineColor();
        context.fillRect(this.x, this.y, this.squareEdge, this.squareEdge);
    }

    determineColor(){
        if(!this.isFilled)
            context.fillStyle = this.originalColor;
        else
            context.fillStyle = this.color;
    }

    checkIfShouldBeMelting(){
        if(!this.shouldMelt && ParticleSphere.particles.length == 0)        // Ako sam istrošio sve partikle onda počne da menja boju
            this.shouldMelt = true;
    }

    melt(){
        let rgb = Utils.colorValues(this.color);
        if(rgb != null)
            this.color = `rgb(${rgb[0] + 0.5}, ${rgb[1]}, ${rgb[2] - 0.5})`;    // povećavam crvenu smanjujem plavu, to mi daje idealnu toplu boju

        if(rgb[0] >= 255){                      // kad se zagrejalo na max vraćam ga u originalno stanje
            this.color = this.originalColor;
            ParticleSphere.addAParticle();
            this.shouldMelt = false;
            this.isFilled = false;
        }
    }

    checkSquareParticleCollision(){
        ParticleSphere.particles.forEach(particle => { 
            if(this.particleShouldBeAbsorbed(particle))
                this.absorbParticle(particle);
        });
    }

    particleShouldBeAbsorbed(particle){
        return !this.isFilled && this.isParticleCollidingWithSquare(particle.x, particle.y, this.x, this.y, this.squareEdge);
    }

    isParticleCollidingWithSquare(pX, pY, sX, sY, edge){
        if(pX > sX && pX < sX + edge && pY > sY && pY < sY + edge)
            return true;
        return false;
    }

    absorbParticle(particle){
        this.takenColor = particle.color;               // Kocka preuzme boju partikle sa kojom se sudari
        this.color = this.takenColor;
        this.isFilled = true;                           // Da obezbedim da ne menja dalje boju
        ParticleSphere.removeParticle(particle);
    }
}
