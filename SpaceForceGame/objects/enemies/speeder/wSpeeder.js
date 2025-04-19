self.onmessage = function (e) {
    let data = e.data;
    let newPosition = {x: data.wX, y: data.wY, lastDirection: data.wDirection};
    switch (data.wDirection) {
        case 'down':  newPosition.y += data.wDistance; break;
        case 'left':  newPosition.x -= data.wDistance; break;
        case 'right': newPosition.x += data.wDistance; break;
        case 'downLeft':  newPosition.y += data.wDistance; newPosition.x -= data.wDistance; break;
        case 'downRight': newPosition.y += data.wDistance; newPosition.x += data.wDistance; break;
    }
    self.postMessage(newPosition);
}
// worker.postMessage()	  Główna aplikacja → Worker
// self.onmessage	      Worker odbiera dane od aplikacji
// self.postMessage()	  Worker → Główna aplikacja
// worker.onmessage	      Główna aplikacja odbiera dane z Workera