'use strict';

class Player {
    player = null;
    worker = undefined;
    board = document.querySelector('.game-board');
    infoHp = document.querySelector('.player-info .hp div');
    infoFireRate = document.querySelector('.player-info .fire-rate div');
    playerPosition = undefined;
    distance = 3;  // px (default: 5)
    refresh = 1000 / 100;  // FPS (min: 10ms)
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
    isBorder = [];  // false | [value] | [value]
    ShootingLoop = false;
    fireRate = 0.7;  // dealy between shots in seconds (begin: 0.7 | min: 0.1)
    bulletSpeed = 5;  // px per refresh
    bulletPositionCorrect = { left: -3, right: 3 };  // px
    hp = 100;  // todo później z bazy danych
    damage = 35;  // todo później z bazy danych 
    detectEnemyBulletLoop = undefined;
    constructor(tag) {
        this.player = document.querySelector(tag);
        this.worker = new Worker('/wp-content/themes/SpaceForceGame/objects/player/wPlayer.js');
        this.worker.onmessage = (e) => {
            this.#updatePosition(e.data.x, e.data.y, e.data.lastDirection);
        };
        this.infoHp.style.width = this.hp + '%';
        this.infoFireRate.style.width = this.#updateFireRateBar(this.fireRate) + '%';
    }
    removeWorker() {
        this.worker.terminate();  // todo obsłuż to w innej metodzie
    }
    #playerMove(direction, isStop) {
        if (!isStop) {
            this.directions[direction] = setInterval(() => {
                this.playerPosition = { left: StyleRead.getStyleLeft(this.player), top: StyleRead.getStyleTop(this.player) };   // TUTAJ
                this.worker.postMessage({
                    wX: this.playerPosition.left,
                    wY: this.playerPosition.top,
                    wDirection: direction,
                    wDistance: this.distance
                });
            }, this.refresh);
        } else {
            clearInterval(this.directions[direction]);
        }
    }
    #updatePosition(x, y, lastDirection) {
        if (lastDirection == 'ArrowUp'|| lastDirection == 'ArrowDown') {
            this.player.style.top = y + 'px';
            }
        else {
            this.player.style.left = x + 'px';
        }
        this.#detectBorder();
    }
    #handleKeyDown = (e) => this.#keyDown(e);
    #handleKeyUp = (e) => this.#keyUp(e);
    #keyDown(e) {
        this.key = e.key;
        switch (this.key) {
            case 'ArrowUp':
                if (!this.MoveUpBlock) {
                    if (!this.isBorder.includes('top')) {
                        this.#playerMove(this.key, false);
                        this.MoveUpBlock = true;
                    }
                }
                break;
            case 'ArrowDown':
                if (!this.MoveDownBlock) {
                    if (!this.isBorder.includes('bottom')) {
                        this.#playerMove(this.key, false);
                        this.MoveDownBlock = true;
                    }
                }
                break;
            case 'ArrowLeft':
                if (!this.MoveLeftBlock) {
                    if (!this.isBorder.includes('left')) {
                        this.#playerMove(this.key, false);
                        this.MoveLeftBlock = true;
                    }
                }
                break;
            case 'ArrowRight':
                if (!this.MoveRightBlock) {
                    if (!this.isBorder.includes('right')) {
                        this.#playerMove(this.key, false);
                        this.MoveRightBlock = true;
                    }
                }
                break;
        }
    }
    #keyUp(e) {
        this.key = e.key;
        switch (this.key) {
            case 'ArrowUp':
                if (!this.isBorder.includes('top')) {
                    this.#playerMove(this.key, true);
                    this.MoveUpBlock = false;
                }
                break;
            case 'ArrowDown':
                if (!this.isBorder.includes('bottom')) {
                    this.#playerMove(this.key, true);
                    this.MoveDownBlock = false;
                }
                break;
            case 'ArrowLeft':
                if (!this.isBorder.includes('left')){ 
                    this.#playerMove(this.key, true);
                    this.MoveLeftBlock = false;
                }
                break;
            case 'ArrowRight':
                if (!this.isBorder.includes('right')) {
                    this.#playerMove(this.key, true);
                    this.MoveRightBlock = false;
                }
                break;
        }
    }
    #detectBorder() {
        this.isBorder = [];
        if (StyleRead.getStyleTop(this.player) < 10) {
            this.#playerMove('ArrowUp', true);
            if (!this.isBorder.includes('top')) {
                this.isBorder.push('top');
            }
        }
        if (StyleRead.getStyleBottom(this.player) < 20) {
            this.#playerMove('ArrowDown', true);
            if (!this.isBorder.includes('bottom')) {
                this.isBorder.push('bottom');
            }
        }
        if (StyleRead.getStyleLeft(this.player) < 10) {
            this.#playerMove('ArrowLeft', true);
            if (!this.isBorder.includes('left')) {
                this.isBorder.push('left');
            }
        }
        if (StyleRead.getStyleRight(this.player) < 10) {
            this.#playerMove('ArrowRight', true);
            if (!this.isBorder.includes('right')) {
                this.isBorder.push('right');
            }
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
        let playerPosition;
        this.ShootingLoop = setInterval(() => {
            if (this.playerPosition == undefined) {
                playerPosition = this.#beforeFirstMove();
                this.#fireBullet(playerPosition);
            } else {
                this.#fireBullet(this.playerPosition);
            }
        }, this.fireRate * 1000);
    }
    stopShooting() {
        clearInterval(this.ShootingLoop);
    }
    #beforeFirstMove() {
        let position = { left: StyleRead.getStyleLeft(this.player), top: StyleRead.getStyleTop(this.player) };
        return position;
    }
    #fireBullet(playerPosition) {
        const bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');
        
        let bulletPositionCorrect = 0;
        if (this.key == 'ArrowLeft') {
            bulletPositionCorrect = this.bulletPositionCorrect.left;
        } else if (this.key == 'ArrowRight') {
            bulletPositionCorrect = this.bulletPositionCorrect.right;
        }

        bullet.style.left = (playerPosition.left + bulletPositionCorrect + (StyleRead.getStyleWidth(this.player) / 2)) + 'px';
        bullet.style.top = playerPosition.top + 'px';
        this.player.appendChild(bullet);

        setInterval(() => {
            bullet.style.top = (StyleRead.getStyleTop(bullet) - this.bulletSpeed) + 'px';
            if (StyleRead.getStyleTop(bullet) < 0) {
                bullet.remove();
            }
        }, this.refresh);
    }
    #updateFireRateBar(fireRate) {
        // switch (fireRate) {
        //     case 0.7: return (100 / 7) * 1;
        //     case 0.6: return (100 / 7) * 2;
        //     case 0.5: return (100 / 7) * 3;
        //     case 0.4: return (100 / 7) * 4;
        //     case 0.3: return (100 / 7) * 5;
        //     case 0.2: return (100 / 7) * 6;
        //     case 0.1: return (100 / 7) * 7;
        // }
        return ((100 / 7) * ((0.8 - fireRate) / 0.1)).toFixed(2);
    }
    detectEnemyBulletLoop_CAEL
}



//const test = document.querySelector('.enemy-1');
// const style = getComputedStyle(test);
// const value = style.getPropertyValue('left');

// setInterval(() => {
//     test.style.left = (getValue() + 6) + 'px';
// }, 1000 / 60);









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