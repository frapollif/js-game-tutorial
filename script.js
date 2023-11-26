const canvas = document.querySelector('canvas');

canvas.width = 576;
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
    constructor({ position, velocity, color, size }) {
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    move(velocity) {
        this.position.x += velocity.x;
        this.position.y += velocity.y;
        // gravity, and collision with floor
        if (this.position.y >= canvas.height - this.size.y) {
            this.position.y = canvas.height - this.size.y;
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity_sim;
        }
        // collision with walls
        if (this.position.x <= 0) {
            this.position.x = 0
        } else if (this.position.x >= canvas.width - this.size.x) {
            this.position.x = canvas.width - this.size.x
        }
        //collision with ceiling
        if (this.position.y <= 0) {
            this.position.y = 0
        }

    }



    update() {
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
    size: {
        x: 32,
        y: 100
    }
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
    size: {
        x: 32,
        y: 80,
    }
});

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();

    // player movement
    player1.velocity.x = 0
    player2.velocity.x = 0

    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5

    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5

    } else {

    }
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5

    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5

    } else {
    }


}

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
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
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player2.lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            player2.velocity.y = -10
            break;

    }

});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

    }
});


