class Board {
    #speed;  // equal with CSS
    #part1 = document.querySelectorAll('.part')[0];
    #part2 = document.querySelectorAll('.part')[1];
    #part3 = document.querySelectorAll('.part')[2];
    #loop = null;
    #isFirst = true;
    constructor(speed, image) {
        this.#speed = speed * 1000;
        this.#changeClass(this.#part1, 'instant-screen');
        this.#changeClass(this.#part2, 'slide-down');
        this.#changeClass(this.#part3, 'instant-top');
    }
    runLoop() {
        const loop = () => {
            this.#changeClass(this.#part1, 'slide-down');
            this.#changeClass(this.#part2, 'instant-top');
            this.#changeClass(this.#part3, 'slide-screen');
            setTimeout(() => {
                this.#changeClass(this.#part1, 'instant-top');
                this.#changeClass(this.#part2, 'slide-screen');
                this.#changeClass(this.#part3, 'slide-down');
            }, this.#speed);
            setTimeout(() => {
                this.#changeClass(this.#part1, 'slide-screen');
                this.#changeClass(this.#part2, 'slide-down');
                this.#changeClass(this.#part3, 'instant-top');
            }, this.#speed * 2);
        };
        loop();
        this.#loop = setInterval(loop, this.#speed * 3);
    }
    #changeClass(part, addCls) {
        part.classList.remove('slide-screen', 'slide-down', 'instant-top', 'instant-screen');
        part.classList.add(addCls);
        part.offsetWidth;
        // part.offsetWidth  // wymusza przeliczenie stylów (reflow / repaint) w przeglądarce.
        // Przeglądarka musi wtedy:
        //   przejść cały render tree
        //   zaktualizować pozycje, rozmiary, przejścia
        // To sprawia, że wcześniejsze zmiany klas są "widoczne" i animacja startuje płynnie.
    }
    removeLoop() {
        clearInterval(this.#loop);
    }
}

const board = new Board(5, 'objects/board/board.png');
    board.runLoop();






// 1. Zagnieżdżanie: timeouty są zależne od swoich rodziców
// setTimeout(() => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);
//         setTimeout(() => {
//             console.log(3);
//         }, 1000);
//     }, 1000);
// }, 1000);

// 2. Osobne: timeouty są niezależne
// setTimeout(() => {
//     console.log(1);
// }, 1000);
// setTimeout(() => {
//     console.log(2);
// }, 2000);
// setTimeout(() => {
//     console.log(3);
// }, 3000);

// 3. setTimeout JEST ASYNCHRONICZNY!!!
// setTimeout(() => {
//     console.log(1);
// }, 1000);
// console.log(2);