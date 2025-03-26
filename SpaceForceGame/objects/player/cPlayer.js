class Player {
    player = null;
    worker = undefined;
    constructor(tag) {
        this.player = document.querySelector(tag);
        this.worker = new Worker('/wp-content/themes/SpaceForceGame/objects/player/wPlayer.js');
        this.worker.onmessage = (e) => {
            this.#updatePosition(e.data.x, e.data.y, e.data.lastDirection);
        };
    }
    positionObject = undefined;
    distance = 2.5;  // px (default: 5)
    refresh = 1000 / 120;  // FPS (max: 60)
    key = "";
    directions = {
        ArrowUp: undefined,
        ArrowDown: undefined,
        ArrowLeft: undefined,
        ArrowRight: undefined
    };
    MoveUpBlock = false;
    MoveDownBlock = false;
    MoveLeftBlock = false;
    MoveRightBlock = false;
    ShootingLoop = false;
    fireRate = 0.75;  // dealy between shots in seconds
    bulletLifeTime = 1.5;  // ['bullet'] transition-duration
    removeWorker() {
        this.worker.terminate();
    }
    #playerMove(direction, isStop) {
        if (!isStop) {
                this.directions[direction] = setInterval(() => {
                    this.positionObject = this.player.getBoundingClientRect();
                    this.worker.postMessage({
                        wX: this.positionObject.left,
                        wY: this.positionObject.top,
                        wDirection: direction,
                        wDistance: this.distance
                    });
                }, this.refresh);
        } else {
            clearInterval(this.directions[direction]);
        }
    }
    #updatePosition(x, y, lastDirection) {
        if (lastDirection == 'ArrowUp' || lastDirection == 'ArrowDown') {
            this.player.style.top = y + 'px';
            }
        else {
            this.player.style.left = x + 'px';
        }
    }
    #handleKeyDown = (e) => this.#keyDown(e);
    #handleKeyUp = (e) => this.#keyUp(e);
    #keyDown(e) {
        this.key = e.key;
        switch (this.key) {
            case 'ArrowUp':
                if (!this.MoveUpBlock) {
                    this.#playerMove(this.key, false);
                    this.MoveUpBlock = true;
                }
                break;
            case 'ArrowDown':
                if (!this.MoveDownBlock) {
                    this.#playerMove(this.key, false);
                    this.MoveDownBlock = true;
                }
                break;
            case 'ArrowLeft':
                if (!this.MoveLeftBlock) {
                    this.#playerMove(this.key, false);
                    this.MoveLeftBlock = true;
                }
                break;
            case 'ArrowRight':
                if (!this.MoveRightBlock) {
                    this.#playerMove(this.key, false);
                    this.MoveRightBlock = true;
                }
                break;
        }
    }
    #keyUp(e) {
        this.key = e.key;
        switch (this.key) {
            case 'ArrowUp':
                this.#playerMove(this.key, true);
                this.MoveUpBlock = false;
                break;
            case 'ArrowDown':
                this.#playerMove(this.key, true);
                this.MoveDownBlock = false;
                break;
            case 'ArrowLeft':
                this.#playerMove(this.key, true);
                this.MoveLeftBlock = false;
                break;
            case 'ArrowRight':
                this.#playerMove(this.key, true);
                this.MoveRightBlock = false;
                break;
        }
    }
    setAEL() {
        document.addEventListener('keydown', this.#handleKeyDown, false);
        document.addEventListener('keyup', this.#handleKeyUp, false);
    }
    removeAEL() {
        document.removeEventListener('keydown', this.#handleKeyDown, false);
        document.removeEventListener('keyup', this.#handleKeyUp, false);
    }
    runShooting() {
        let positionObject;
        this.ShootingLoop = setInterval(() => {
            if (this.positionObject == undefined) {
                positionObject = this.#beforeFirstMove();
                this.#fireBullet(positionObject);
            } else {
                this.#fireBullet([this.positionObject.left, this.positionObject.top]);
            }
        }, this.fireRate * 1000);
    }
    stopShooting() {
        clearInterval(this.ShootingLoop);
    }
    #beforeFirstMove() {
        let position = this.player.getBoundingClientRect();
        return [position.left, position.top];
    }
    #fireBullet(playerPosition) {
        // console.log(playerPosition[0]);
        // console.log(playerPosition[1] + '\n\n');
        const bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');
        bullet.style.left = (playerPosition[0] + (this.player.getBoundingClientRect().width / 2)) + 'px';
        bullet.style.top = playerPosition[1] + 'px';
        this.player.appendChild(bullet);

        setInterval(() => {
            bullet.style.top = (bullet.getBoundingClientRect().top - 5) + 'px';
            if (bullet.getBoundingClientRect().top < 0) {
                bullet.remove();
            }
        }, this.refresh);
    }
}


















// class Player {
//     #player = null;
//     constructor(tag) {
//         this.#player = document.querySelector(tag);
//     }
//     directions = {
//         ArrowUp: null,
//         ArrowDown: null,
//         ArrowLeft: null,
//         ArrowRight: null
//     };
//     MoveUpBlock = false;
//     MoveDownBlock = false;
//     MoveLeftBlock = false;
//     MoveRightBlock = false;
//     distance = 5;  // px (default: 2.5)
//     refresh = 1000 / 60;  // FPS (default: 60)
//     key = "";
//     #playerMove(direction, isStop) {
//         if (!isStop) {
//             this.directions[direction] = setInterval(() => {
//                 switch (direction) {
//                     case 'ArrowUp': this.#player.style.top = (this.#player.getBoundingClientRect().top - this.distance) + 'px'; break;
//                     case 'ArrowDown': this.#player.style.top = (this.#player.getBoundingClientRect().top + this.distance) + 'px'; break;
//                     case 'ArrowLeft': this.#player.style.left = (this.#player.getBoundingClientRect().left - this.distance) + 'px'; break;
//                     case 'ArrowRight': this.#player.style.left = (this.#player.getBoundingClientRect().left + this.distance) + 'px'; break;
//                 }
//             }, this.refresh);
//         } else {
//             clearInterval(this.directions[direction]);
//         }
//     }
//     #handleKeyDown = (e) => this.#keyDown(e);
//     #handleKeyUp = (e) => this.#keyUp(e);
//     #keyDown(e) {
//         this.key = e.key;
//         switch (this.key) {
//             case 'ArrowUp':
//                 if (!this.MoveUpBlock) {
//                     this.#playerMove(this.key, false);
//                     this.MoveUpBlock = true;
//                 }
//                 break;
//             case 'ArrowDown':
//                 if (!this.MoveDownBlock) {
//                     this.#playerMove(this.key, false);
//                     this.MoveDownBlock = true;
//                 }
//                 break;
//             case 'ArrowLeft':
//                 if (!this.MoveLeftBlock) {
//                     this.#playerMove(this.key, false);
//                     this.MoveLeftBlock = true;
//                 }
//                 break;
//             case 'ArrowRight':
//                 if (!this.MoveRightBlock) {
//                     this.#playerMove(this.key, false);
//                     this.MoveRightBlock = true;
//                 }
//                 break;
//         }
//     }
//     #keyUp(e) {
//         this.key = e.key;
//         switch (this.key) {
//             case 'ArrowUp':
//                 this.#playerMove(this.key, true);
//                 this.MoveUpBlock = false;
//                 break;
//             case 'ArrowDown':
//                 this.#playerMove(this.key, true);
//                 this.MoveDownBlock = false;
//                 break;
//             case 'ArrowLeft':
//                 this.#playerMove(this.key, true);
//                 this.MoveLeftBlock = false;
//                 break;
//             case 'ArrowRight':
//                 this.#playerMove(this.key, true);
//                 this.MoveRightBlock = false;
//                 break;
//         }
//     }
//     setAEL() {
//         document.addEventListener('keydown', this.#handleKeyDown, false);
//         document.addEventListener('keyup', this.#handleKeyUp, false);
//     }
//     removeAEL() {
//         document.removeEventListener('keydown', this.#handleKeyDown, false);
//         document.removeEventListener('keyup', this.#handleKeyUp, false);
//     }
// }

// // const player = new Player('.player');
// // player.setAEL();
// // //player.removeAEL();