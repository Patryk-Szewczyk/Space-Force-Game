'use strict';

class Speeder {
    speeder = null;
    image = null;
    worker = undefined;
    board = document.querySelector('.game-board');
    infoHp = undefined;  // todo przy tworzeniu elementu
    hp = 100;
    constructor(type) {
        this.#createSpeeder();
        this.#selectType(type);
        this.worker = new Worker('/wp-content/themes/SpaceForceGame/objects/enemies/speeder/wSpeeder.js');
        this.worker.onmessage = (e) => {
            this.#updatePosition(e.data.x, e.data.y, e.data.lastDirection);
        };
    }
    #createSpeeder() {
        const speeder = document.createElement('div');
        speeder.setAttribute('class', 'speeder');
        for (let i = 0; i < 3; i++) {
            const hitbox = document.createElement('div');
            hitbox.setAttribute('class', 'hitbox');
            speeder.appendChild(hitbox);
        }
        const image = document.createElement('div');
        image.setAttribute('class', 'image');
        speeder.appendChild(image);
        const hp = document.createElement('div');
        hp.setAttribute('class', 'hp');
        const hpBar = document.createElement('div');
        hp.appendChild(hpBar);
        speeder.appendChild(hp);
        this.board.appendChild(speeder);
        this.speeder = speeder;
        this.infoHp = hpBar;
        this.image = image;
    }
    #selectType(type) {
        switch (type) {
            case 1:
              this.hp = 100;
              this.image.classList.add('image-1');
              break;
            case 2:
              this.hp = 150;
              this.image.classList.add('image-2');
              break;
            case 3:
              this.hp = 200;
              this.image.classList.add('image-3');
              break;
            case 4:
              this.hp = 250;
              this.image.classList.add('image-4');
              break;
          }
          
    }
    #setImage(color) {
        this.speeder.style.backgroundImage = `url('wp-content/themes/SpaceForceGame/objects/enemies/speeder/images/enemy${color}1.png')`;
    }
    deleteSpeeder() {
        this.board.removeChild(this.speeder);
        return null;

    }
    run(startPosition, direction, speed) {  // {x: 50px, Y: 0px}, '', 5

    }
    #updatePosition(x, y, lastDirection) {
        if (lastDirection == 'down') {
            this.speeder.style.top = y + 'px';
        } else if (lastDirection == 'left' || lastDirection == 'right') {
            this.speeder.style.left = x + 'px';
        } else {
            this.speeder.style.left = x + 'px';
            this.speeder.style.top = y + 'px';
        }
    }
}

let speeder = new Speeder(3);
// speeder = speeder.deleteSpeeder();


