import { Player, Platform, Obstacle, Spaceship, keys, gravity } from './game.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

let player;
let platforms;
let obstacles;
let spaceship;
let scrollOffset;
let animationId;
let score;

function init() {
    player = new Player();
    platforms = [];
    obstacles = [];
    for (let i = 0; i < 100; i++) {
        platforms.push(new Platform({ x: i * 200, y: 526 }));
        if (i % 3 === 0) {
            obstacles.push(new Obstacle({ x: i * 200 + 150, y: 490 }));
        }
    }
    spaceship = new Spaceship({ x: 4000, y: 176 });
    scrollOffset = 0;
    score = 0;
    document.querySelector('.score').innerText = `Score: ${score}`;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(platform => {
        platform.draw(c);
    });
    obstacles.forEach(obstacle => {
        obstacle.draw(c);
    });
    spaceship.draw(c);
    player.update(c, canvas, gravity);

 
        player.velocity.x = 0;
        platforms.forEach(platform => {
            platform.position.x -= 5;
        });
        obstacles.forEach(obstacle => {
            obstacle.position.x -= 5;
        });
        spaceship.position.x -= 5;
        scrollOffset += 5;
    

    
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        }
    });

    
    obstacles.forEach(obstacle => {
        if (player.position.x + player.width / 2 > obstacle.position.x &&
            player.position.x + player.width / 2 < obstacle.position.x + obstacle.width &&
            player.position.y + player.height > obstacle.position.y &&
            player.position.y + player.height < obstacle.position.y + obstacle.height) {
            showLoseDialog();
        } else if (player.position.x > obstacle.position.x + obstacle.width) {
            score += 1;
            document.querySelector('.score').innerText = `Score: ${score}`;
        }
    });

    if (scrollOffset > 4000) { 
        showWinDialog();
    }
}

function showWinDialog() {
    cancelAnimationFrame(animationId);

    const dialog = document.createElement('div');
    dialog.className = 'dialog';

    const message = document.createElement('p');
    message.innerText = `Congratulations! You reached the spaceship with a score of ${score}!`;
    dialog.appendChild(message);

    const button = document.createElement('button');
    button.innerText = 'Play Again';
    button.onclick = () => {
        dialog.remove();
        init();
        animate();
    };
    dialog.appendChild(button);

    document.body.appendChild(dialog);
}

function showLoseDialog() {
    cancelAnimationFrame(animationId);

    const dialog = document.createElement('div');
    dialog.className = 'dialog';

    const message = document.createElement('p');
    message.innerText = `Oh no! An alien ate you. Your score: ${score}. Try again?`;
    dialog.appendChild(message);

    const button = document.createElement('button');
    button.innerText = 'Try Again';
    button.onclick = () => {
        dialog.remove();
        init();
        animate();
    };
    dialog.appendChild(button);

    document.body.appendChild(dialog);
}

init();
animate();

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 32:
            if (player.velocity.y == 0) {
                player.velocity.y -= 12; 
            }
            break;
        default:
            break;
    }
});

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 32:
            break;
        default:
            break;
    }
});


const title = document.createElement('div');
title.className = 'title';
title.innerText = 'AstroRun';
document.body.appendChild(title);



const instruction = document.createElement('div');
instruction.className = 'instruction';
instruction.innerText = 'Press SPACE to jump';
document.body.appendChild(instruction);