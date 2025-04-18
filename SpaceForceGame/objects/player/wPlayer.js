self.onmessage = function (e) {
    let data = e.data;
    let newPosition = {x: data.wX, y: data.wY, lastDirection: data.wDirection};
    switch (data.wDirection) {
        case 'ArrowUp':    newPosition.y -= data.wDistance; break;
        case 'ArrowDown':  newPosition.y += data.wDistance; break;
        case 'ArrowLeft':  newPosition.x -= data.wDistance; break;
        case 'ArrowRight': newPosition.x += data.wDistance; break;
    }
    self.postMessage(newPosition);
}
// worker.postMessage()	  Główna aplikacja → Worker
// self.onmessage	      Worker odbiera dane od aplikacji
// self.postMessage()	  Worker → Główna aplikacja
// worker.onmessage	      Główna aplikacja odbiera dane z Workera