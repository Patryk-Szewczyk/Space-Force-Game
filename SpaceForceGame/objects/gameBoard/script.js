class Board {
    #speed;  // equal with CSS
    #part1 = document.querySelectorAll('.part')[0];
    #part2 = document.querySelectorAll('.part')[1];
    #part3 = document.querySelectorAll('.part')[2];
    #loop = null;
    constructor(speed) {
        this.#speed = speed * 1000;
        // 1: screen | 2: down | 3: top 
        this.#changeClass(this.#part1, 'instant-screen');
        this.#changeClass(this.#part2, 'slide-down');
        this.#changeClass(this.#part3, 'instant-top');
    }
    runLoop() {
        const loop = () => {
            // 1: screen > down | 2: down > top | 3: top > screen 
            this.#changeClass(this.#part1, 'slide-down');
            this.#changeClass(this.#part2, 'instant-top');
            this.#changeClass(this.#part3, 'slide-screen');
            // 1: down > top | 2: top > screen | 3: screen > down
            setTimeout(() => {
                this.#changeClass(this.#part1, 'instant-top');
                this.#changeClass(this.#part2, 'slide-screen');
                this.#changeClass(this.#part3, 'slide-down');
            }, this.#speed);
            // 1: top > screen | 2: screen > down | 3: down > top
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
        //   - przejść cały render tree
        //   - zaktualizować pozycje, rozmiary, przejścia
        // To powoduje, że wcześniejsze zmiany klas są "widoczne" i animacja startuje płynnie.
    }
    removeLoop() {
        clearInterval(this.#loop);
    }
}

// document.querySelector('.game-board').style.display = 'flex';
const board = new Board(8);  // default: 5 [time to slide]
board.runLoop();

// document.querySelector('.board').style.display = 'none';  // OK
// board.removeLoop();  // OK // Jeżeli obecnie jest wykonywana iteracja pętli, to ona przeleci i już dalej nie będzie pętli - z racji tego, iż setTimeouty są asynchroniczne, ich inicjacja (wszystkich) następuje w momencie iteracji pętli.

// setTimeout(() => {  // OK // Ponownie wstaw pętlę z interwałem i uruchom je.
//     board.runLoop();
// }, 20000)






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