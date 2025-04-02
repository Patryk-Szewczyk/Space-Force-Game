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
    playerPosition = undefined;
    distance = 5;  // px (default: 5)
    refresh = 1000 / 60;  // FPS (max: 60)
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
    isBorder = false;
    ShootingLoop = false;
    fireRate = 0.7;  // dealy between shots in seconds (begin: 0.7 | min: 0.1)
    bulletLifeTime = 1.5;  // ['bullet'] transition-duration
    removeWorker() {
        this.worker.terminate();
    }
    #playerMove(direction, isStop) {
        if (!isStop) {
            this.directions[direction] = setInterval(() => {
                this.playerPosition = { left: getStyleLeft(this.player), top: getStyleTop(this.player) };   // TUTAJ
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
        this.isBorder = this.#detectBorder();   // todo test
    }
    #handleKeyDown = (e) => this.#keyDown(e);
    #handleKeyUp = (e) => this.#keyUp(e);
    #keyDown(e) {
        this.key = e.key;
        switch (this.key) {
            case 'ArrowUp':
                if (!this.MoveUpBlock) {
                    if (this.isBorder != 'top') {
                        this.#playerMove(this.key, false);
                        this.MoveUpBlock = true;
                    }
                }
                break;
            case 'ArrowDown':
                if (!this.MoveDownBlock) {
                    if (this.isBorder != 'bottom') {
                        this.#playerMove(this.key, false);
                        this.MoveDownBlock = true;
                    }
                }
                break;
            case 'ArrowLeft':
                if (!this.MoveLeftBlock) {
                    if (this.isBorder != 'left'){ 
                        this.#playerMove(this.key, false);
                        this.MoveLeftBlock = true;
                    }
                }
                break;
            case 'ArrowRight':
                if (!this.MoveRightBlock) {
                    if (this.isBorder != 'right') {
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
                if (this.isBorder != 'top') {
                    this.#playerMove(this.key, true);
                    this.MoveUpBlock = false;
                }
                break;
            case 'ArrowDown':
                if (this.isBorder != 'bottom') {
                    this.#playerMove(this.key, true);
                    this.MoveDownBlock = false;
                }
                break;
            case 'ArrowLeft':
                if (this.isBorder != 'left'){ 
                    this.#playerMove(this.key, true);
                    this.MoveLeftBlock = false;
                }
                break;
            case 'ArrowRight':
                if (this.isBorder != 'right') {
                    this.#playerMove(this.key, true);
                    this.MoveRightBlock = false;
                }
                break;
        }
    }
    #detectBorder() {  // todo fix this
        if (getStyleTop(this.player) < 15) {
            // console.log('top | ' + this.key);
            this.#playerMove('ArrowUp', true);
            return 'top';
        }
        if (getStyleBottom(this.player) < 30) {
            // console.log('bottom | ' + this.key);
            this.#playerMove('ArrowDown', true);
            return 'bottom';
        }
        if (getStyleLeft(this.player) < 15) {
            // console.log('left | ' + this.key);
            this.#playerMove('ArrowLeft', true);
            return 'left';
        }
        if (getStyleRight(this.player) < 15) {
            // console.log('right | ' + this.key);
            this.#playerMove('ArrowRight', true);
            return 'right';
        }
        return false;
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
                this.#fireBullet([this.playerPosition.left, this.playerPosition.top]);
            }
        }, this.fireRate * 1000);
    }
    stopShooting() {
        clearInterval(this.ShootingLoop);
    }
    #beforeFirstMove() {
        let position = { left: getStyleLeft(this.player), top: getStyleTop(this.player) };
        return [position.left, position.top];
    }
    #fireBullet(playerPosition) {
        // console.log(playerPosition[0]);
        // console.log(playerPosition[1] + '\n\n');
        const bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');
        bullet.style.left = (playerPosition[0] + (getStyleWidth(this.player) / 2)) + 'px';
        bullet.style.top = playerPosition[1] + 'px';
        this.player.appendChild(bullet);

        setInterval(() => {
            bullet.style.top = (getStyleTop(bullet) - 5) + 'px';
            if (getStyleTop(bullet) < 0) {
                bullet.remove();
            }
        }, this.refresh / 2);
    }
}









//const test = document.querySelector('.enemy-1');
// const style = getComputedStyle(test);
// const value = style.getPropertyValue('left');

// setInterval(() => {
//     test.style.left = (getValue() + 6) + 'px';
// }, 1000 / 60);


function getStyleLeft(object) {
    return (Number)((String)(getComputedStyle(object).getPropertyValue('left')).slice(0, -2));
}
function getStyleRight(object) {
    return (Number)((String)(getComputedStyle(object).getPropertyValue('right')).slice(0, -2));
}
function getStyleTop(object) {
    return (Number)((String)(getComputedStyle(object).getPropertyValue('top')).slice(0, -2));
}
function getStyleBottom(object) {
    return (Number)((String)(getComputedStyle(object).getPropertyValue('bottom')).slice(0, -2));
}
function getStyleWidth(object) {
    return (Number)((String)(getComputedStyle(object).getPropertyValue('width')).slice(0, -2));
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