export const gravity = 0.5;

export const keys = {
    right: {
        pressed: false
    }
};

export class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 200
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.width = 127.775;
        this.height = 150;
        this.image = new Image();
        this.image.src = './assets/images/spriteRunRight.png'; 
        this.frames = 0;
        this.cropWidth = 341;
    }

    draw(c) {
        c.drawImage(
            this.image,
            this.cropWidth * this.frames,
            0,
            this.cropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update(c, canvas, gravity) {
        this.frames++;
        if (this.frames > 29) this.frames = 0;
        this.draw(c);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

export class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        };
        this.width = 200;
        this.height = 50;
    }

    draw(c) {
        c.fillStyle = '#8B4513'; 
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export class Obstacle {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        };
        this.width = 70; 
        this.height = 60; 
        this.image = new Image();
        this.image.src = './assets/images/alien.png'; 
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

export class Spaceship {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        };
        this.width = 300; 
        this.height = 150; 
        this.image = new Image();
        this.image.src = './assets/images/space-machine.png'; 
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}
