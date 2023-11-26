const canvas = document.querySelector('canvas');

canvas.width = 1024;
canvas.height = 576;

const gravity_sim = 0.5;

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    }
  }

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({position,velocity,color}){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, 32, 32);
    }

    move(velocity){
        this.position.x += velocity.x;
        this.position.y += velocity.y;
        if(this.position.y >= canvas.height-32){
            this.position.y = canvas.height-32;
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity_sim;
        }
        
    }

  

    update(){
        this.draw();
        this.move(this.velocity);
      
    }
}



const player1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: 'red',
});

const player2 = new Sprite({
    position: {
        x: 300,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color: 'green',
});

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();

      // player movement
      player1.velocity.x = 0

  if (keys.a.pressed && player1.lastKey === 'a') {
    player1.velocity.x = -5

  } else if (keys.d.pressed && player1.lastKey === 'd') {
    player1.velocity.x = 5

  } else {
 
  }


}

animate();

window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w':
            player1.velocity.y = -10
            break;
        case 'a':
            keys.a.pressed = true
            player1.lastKey = 'a'
            break;
        case 'd':
            keys.d.pressed = true;
            player1.lastKey = 'd';
            break;
    }

});

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});


