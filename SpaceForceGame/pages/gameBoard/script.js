// Przenieś to do obiektów typu level, każdy level ma zawierać klasę z metodą gówną - run,
// która wjest sterownikiem dla danego poziomu:

const player = new Player('.player');
player.setAEL();
//player.removeAEL();  // usunięcie eventListenerów tej klasy
//player.removeWorker();  // usunięcie workera tej klasy
//player = null;  // usunięcie klasy
console.log(player.worker);


player.runShooting();  // OK

// setTimeout(() => {
//     player.stopShooting();  // OK
// }, 1000 * 5)