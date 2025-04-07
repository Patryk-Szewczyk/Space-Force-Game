/*
* WorkerControl jest klasą odpowiedzialną za sterowanie czasem życia workerów oraz komunikowania się pomiędzy nimi a wątkiem macierzystym.
*/

class WorkerControl {
    mother = null;
    children = [];
    method = [];
    childrenAmount = this.children.length;
    isEmpty = false;
    constructor(mother, children, method) {
        this.mother = mother;
        this.childern = children;
        this.method = method || undefined;
    }
    addChildren(worker, id) {  // Dodaj workera do obiektu sterownika
        this.children.add({ worker, id });
    }
    deleteWorker(id) {  // id = int
        this.children.forEach(element => {
            if (element.id == id) {
                element.worker.terminate();
                this.children.splice(id, 1);  // usunięcie zajętego miejsca w tablicy (metoda terminate() nie spowoduje zwolnienia miejsca w tablicy)
                this.isEmpty = this.#checkEmpty();
            }
        });
        // this.children[id].worker.terminate();  // usunięcie workera
        // this.children.splice(id, 1);  // usunięcie zajętego miejsca w tablicy (metoda terminate() nie spowoduje zwolnienia miejsca w tablicy)
        // this.isEmpty = this.#checkEmpty();
    }
    #checkEmpty() {
        if (this.childrenAmount == 0) {
            return true;
        }
        return false;
    }
    waitFor() {  // Promise, a w niej interwał, w którym sprawdzam określony warunek
        // (np.czywykryto strzał,a potem wywołuje określoną metodą danego obiektu - gracza lub wroga)
        
    }
}