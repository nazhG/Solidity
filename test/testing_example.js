// const assert = require('assert');
// const ganache = require('ganache-cli'); // el mismo te crea una cuena sin clave privada para tesiar en la red local
// const Web3 = require('web3');

// const web3 = new Web3(ganache.provider());

// // Cambiar el packge.json test: mocha
// // ejecuar npm run test
// //Debuging example

// class Car {
//     park() {
//         return 'stopped';
//     }
//     dirve() {
//         return 'run';
//     }
// }

// let car;

// beforeEach(() => { //corre por antes de cada it
//     car = new Car();
// });

// describe('class Car', () => {
//     it('parking', () => {
//         assert.strictEqual(car.park(), 'stopped');
//     });
    
//     it('driving', () => {
//         assert.strictEqual(car.dirve(), 'run');
//     })
// });