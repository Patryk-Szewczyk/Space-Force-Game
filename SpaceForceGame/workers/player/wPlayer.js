// let base = {  // Dane pobrane z cPlayer.js
//     direction: "ArrowUp",
//     position: {x: 0, y: 0}
// }
// let result = {  // Dane zwracane do cPlayer.js
//     position: {x: 0, y: 0}
// }




self.onmessage = function (e) {
    const { direction, position, distance } = e.data;
    let { x, y } = position;

    switch (direction) {
        case 'ArrowUp': y -= distance; break;
        case 'ArrowDown': y += distance; break;
        case 'ArrowLeft': x -= distance; break;
        case 'ArrowRight': x += distance; break;
    }

    self.postMessage({ x, y });
};






// worker.postMessage()	  Główna aplikacja → Worker
// self.onmessage	      Worker odbiera dane od aplikacji
// self.postMessage()	  Worker → Główna aplikacja
// worker.onmessage	      Główna aplikacja odbiera dane z Workera








// let config = {type: '', tag: ''};

// self.onmessage = function(e) {  // Obliczanie pozycji gracza:
//     config = e.data;
//     if (config.type == 'create') {
//         playerInstance = new Player(document.querySelector(config.tag));
//         playerInstance.setAEL();
//         self.postMessage('Gracz utworzony i eventy ustawione');
//     } else {
//         playerInstance.removeAEL();
//         playerInstance = null;
//         self.postMessage('Gracz usunięty i eventy usunięte');
//     }
// };