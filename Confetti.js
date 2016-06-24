//PROJECT SETUP
angleMode = "radians";
rectMode(CENTER);
strokeWeight(4);
textAlign(CENTER, CENTER);
textSize(117);
/**BASE PARTICLE CLASS**
************************/
var Particle = function(x, y){
    this.position = new PVector(x, y);
    if(mouseIsPressed){
        this.velocity = new PVector(random(-1, 1), random(-5, 1));
        this.acceleration = new PVector(random(-0.5, 0.5), random(0, 0.5));
    }else{
        this.velocity = new PVector(random(-0.3, 0.3), random(0, 0.5));
        this.acceleration = new PVector(random(-0.1, 0.1), random(0, 0.4));
    }
    if(this.acceleration.x === 0){
        this.acceleration.x = 0.2;
    }
    if(this.acceleration.y === 0){
        this.acceleration.y = 0.2;
    }
    this.forceAcceleration = new PVector(0, 0);
    this.timeToLive = 50;
    this.mass = 1;
};
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.add(this.forceAcceleration);
    this.position.add(this.velocity);
    this.forceAcceleration.mult(0);
    this.timeToLive--;
};
Particle.prototype.applyForce = function(force){
    this.forceAcceleration.add(force);
};
Particle.prototype.display = function(){
    fill(219, 105, 219, this.timeToLive);
    ellipse(this.position.x, this.position.y, 20, 20);
};
/**Extended Particle class (confetti)**
***************************************/
var ConfettiTypeA = function(x, y){
  Particle.call(this, x, y);  
};

ConfettiTypeA.prototype = Object.create(Particle.prototype);

ConfettiTypeA.prototype.display = function(){
    fill(15, 0, 227, map(this.timeToLive, 0, 50, 0, 255));
    stroke(0, 0, 0, map(this.timeToLive, 0, 50, 0, 255));
    pushMatrix();
        translate(this.position.x, this.position.y);
        rotate(frameCount * 0.1);
        rect(0, 0, 10, 10);
    popMatrix();
};

var ConfettiTypeB = function(x, y){
  Particle.call(this, x, y);  
};

ConfettiTypeB.prototype = Object.create(Particle.prototype);

ConfettiTypeB.prototype.display = function(){
    fill(219, 7, 21, map(this.timeToLive, 0, 50, 0, 255));
    stroke(0, 0, 0, map(this.timeToLive, 0, 50, 0, 255));
    ellipse(this.position.x, this.position.y, 10, 10);
};

/**Particle System Class**
**************************/
var Confetti = function(x, y){
    this.x = x;this.y = y;
    this.particleSystem = [];
    this.run = function(){
        if(random() > 0.5){
            this.particleSystem.push(new ConfettiTypeA(this.x, this.y));
        }else{
            this.particleSystem.push(new ConfettiTypeB(this.x, this.y));
        }
        for(var i = 0; i < this.particleSystem.length; i++){
            this.particleSystem[i].update();
            this.particleSystem[i].display();
        }
        
        for(var i = 0; i < this.particleSystem.length; i++){
            if(this.particleSystem[i].timeToLive === 0){
                this.particleSystem.splice(i, 1);
            }
        }
            
    };
    
    this.relocate = function(x, y){
        this.x = x;
        this.y = y;
    };
    
    this.applyForce = function(force){
        for(var i = 0; i < this.particleSystem.length; i++){
            this.particleSystem[i].applyForce(force);
        }
    };
};
/**Main Section**
*****************/
var program = {
    displayBackground: function(){
        background(201, 255, 202);
        fill(186, 245, 187);
        text("Confetti", 200, 200);
    },
    confetti: new Confetti(width / 2, height / 2),
    force1: new PVector(0, 0),
};
/**PROGRAM LOOP**
*****************/
draw = function() {
    program.displayBackground();
    program.confetti.relocate(mouseX, mouseY);
    program.confetti.applyForce(program.force1);
    program.confetti.run();
};
