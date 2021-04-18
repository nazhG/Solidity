const assert = require('assert');
const ganache = require('ganache-cli'); // el mismo te crea una cuena sin clave privada para tesiar en la red local
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const abiPath = path.resolve(__dirname,'../bin/contracts','Ballot.abi');
const bytePath = path.resolve(__dirname,'../bin/contracts','Ballot.bin');

// el proveedor da la instrucion de como comuniccarse con la red
// para eso se usa un API de infura, que reemplasa un nodo de la red
// https://infura.io/
const provider = ganache.provider();
const web3 = new Web3(provider);

const interface = fs.readFileSync(abiPath,'utf8');
const bytecode = fs.readFileSync(bytePath,'utf8');

let accounts;
let inbox;
beforeEach(async () => {
    //get al list of all accoun
    accounts = await web3.eth.getAccounts();

    // Use one of those accoun to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from: accounts[0], gas: '1000000'});
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    it('has a default message', async () => {
        const manager = await inbox.methods.manager().call();
        assert.strictEqual(manager, accounts[0]);
    });
});