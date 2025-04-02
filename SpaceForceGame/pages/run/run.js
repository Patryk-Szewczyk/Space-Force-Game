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